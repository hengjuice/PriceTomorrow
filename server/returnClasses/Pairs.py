# Remove unwanted warnings
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

# Data extraction and management
import pandas as pd
import numpy as np
from pandas_datareader.data import DataReader
from pandas_datareader.nasdaq_trader import get_nasdaq_symbols

# Feature Engineering
from sklearn.preprocessing import StandardScaler

# Machine Learning
from sklearn.cluster import KMeans
from sklearn import metrics
from kneed import KneeLocator

# Cointegration and Statistics
from statsmodels.tsa.stattools import coint
import statsmodels.api as sm

# Reporting visualization
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt, mpld3
import matplotlib.cm as cm


# Set Data Extraction parameters
start_date = "2017-01-01"
end_date = "2022-06-01"
file_name = "data/raw_data_etf.csv"
file_name_coint = "data/raw_data_coint_pairs.csv"
load_existing = True
load_coint_pairs = True

# Get New or Load Existing Data
# Allow 15 mins for new data

class Pairs:

    def getETFs(clean_data = True)->pd.DataFrame:
        '''
        Get ETFs Dataframe
        '''
        # Load Data
        symbols = get_nasdaq_symbols()
        symbols = symbols[(symbols["ETF"] == True) & (symbols["Market Category"] == "G")] # G = NASDAQ GLOBAL MARKET
        symbols = list(symbols.index.values)
        #data = DataReader(name=symbols, data_source='yahoo', start=start_date, end=end_date)["Adj Close"] # Dataframe
        try:
            data = pd.read_csv('raw_data_etf.csv')
        except:
            data = pd.read_csv('../raw_data_etf.csv')
        '''
        Data Cleaning - Remove NA values
        '''
        if clean_data:
            data.dropna(axis=1, inplace=True)
            data = data.set_index("Date")
            # print("Shape: ", data.shape)
            # print("Null Values: ", data.isnull().values.any())
            # data.head()
        return data

    def featureEngineering(original_df:pd.DataFrame)->pd.DataFrame:
        '''
        Create DataFrame with Returns and Volatility information
        '''
        data = original_df.copy()
        df_returns = pd.DataFrame(data.pct_change().mean() * 255, columns=["Returns"])
        df_returns["Volatility"] = data.pct_change().std() * np.sqrt(255)

        # Scale Features
        scaler = StandardScaler()
        scaler = scaler.fit_transform(df_returns)
        scaled_data = pd.DataFrame(scaler, columns=df_returns.columns, index=df_returns.index)
        df_scaled = scaled_data
        return df_scaled

    def clustering(df_scaled: pd.DataFrame):
        # Find the optimum number of clusters
        X = df_scaled.copy()
        K = range(1, 15)
        distortions = []
        for k in K:
            kmeans = KMeans(n_clusters=k)
            kmeans.fit(X)
            distortions.append(kmeans.inertia_)
            
        kl = KneeLocator(K, distortions, curve="convex", direction="decreasing")
        c = kl.elbow
        print("Optimum Clusters: ", c)

        # Fit K-Means Model
        k_means = KMeans(n_clusters=c)
        k_means.fit(X)
        prediction = k_means.predict(df_scaled)

        clustered_series = pd.Series(index=X.index, data=k_means.labels_.flatten())
        clustered_series_all = pd.Series(index=X.index, data=k_means.labels_.flatten())
        clustered_series = clustered_series[clustered_series != -1]

        def get_plot_clusters(k_means):
            centroids = k_means.cluster_centers_
            fig = plt.figure(figsize = (15, 8))
            ax = fig.add_subplot(111)
            scatter = ax.scatter(X.iloc[:,0], X.iloc[:,1], c=k_means.labels_, cmap="rainbow", label=X.index)
            ax.set_title("K-Means Cluster Analysis Results")
            ax.set_xlabel("Mean Return")
            ax.set_ylabel("Volatility")
            plt.colorbar(scatter)
            plt.plot(centroids[:,0], centroids[:,1], "sg", markersize=10)
            return mpld3.fig_to_dict(fig)

        def get_plot_bar(clustered_series):
            fig = plt.figure(figsize=(15, 8))
            plt.bar(range(len(clustered_series.value_counts())), clustered_series.value_counts())
            plt.title("Clusters")
            plt.xlabel("Cluster")
            plt.ylabel("Features Count")
            return mpld3.fig_to_dict(fig)
        
        return clustered_series, get_plot_clusters(k_means), get_plot_bar(clustered_series)
        # if flow == 'plot':
        #     return get_plot_clusters(k_means)

        # # flow can be 'data', 'plot'
        # elif flow == 'data':
        #     # Return the series
        #     return clustered_series 
        # elif flow == 'bar':
        #     return get_plot_bar(clustered_series)

        
        

    def cointegrated_pairs(clustered_series, data):
        # Remove items from clustered_series
        clusters_clean = clustered_series[clustered_series < 3]
        print("Feature Number Previous: ", len(clustered_series))
        print("Feature Number Current: ", len(clusters_clean))


        def calculate_cointegration(series_1, series_2):
            '''
            Calculate cointegration
            '''
            coint_flag = 0 # flags whether the pair is cointegrated or not
            coint_res = coint(series_1, series_2) # cointegration result - from statsmodels.tsa.stattools import coint
            coint_t = coint_res[0] # test result
            p_value = coint_res[1] # p-value statistical measure for signifance, we're using 5% level of significance
            critical_value = coint_res[2][1] # critical value
            model = sm.OLS(series_1, series_2).fit()
            hedge_ratio = model.params[0] # need it in order to calculate the spread
            coint_flag = 1 if p_value < 0.05 and coint_t < critical_value else 0 #statistically significant
            return coint_flag, hedge_ratio
        

        # Loop through and calculate cointegrated pairs
        # Allow 10 - 30 mins for calculation 
        tested_pairs = []
        cointegrated_pairs = []


        # for base_asset in clusters_clean.index:
        #     base_label = clusters_clean[base_asset]
            
        #     for compare_asset in clusters_clean.index:
        #         compare_label = clusters_clean[compare_asset]
                
        #         test_pair = base_asset + compare_asset
        #         test_pair = ''.join(sorted(test_pair))
        #         is_tested = test_pair in tested_pairs
        #         tested_pairs.append(test_pair)
                
        #         if compare_asset != base_asset and base_label == compare_label and not is_tested:
                    
        #             series_1 = data[base_asset].values.astype(float)
        #             series_2 = data[compare_asset].values.astype(float)
        #             coint_flag, _ = calculate_cointegration(series_1, series_2)
        #             if coint_flag == 1:
        #                 cointegrated_pairs.append({"base_asset": base_asset, 
        #                                         "compare_asset": compare_asset, 
        #                                         "label": base_label})
        # df_coint = pd.DataFrame(cointegrated_pairs).sort_values(by="label")
        
        # Load offline Data
        try:
            df_coint = pd.read_csv('raw_data_coint_pairs.csv')
        except:
            df_coint = pd.read_csv('../raw_data_coint_pairs.csv')

        return df_coint
                


# Cluster Plotting
if __name__ == '__main__':
    etf_data = Pairs.getETFs(True)
    etf_data_2 = Pairs.featureEngineering(etf_data)
    clustered_series,_,_ = Pairs.clustering(etf_data_2)
    coint_df = Pairs.cointegrated_pairs(clustered_series, etf_data)
    print(coint_df)
    





