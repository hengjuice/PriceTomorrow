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
        data = pd.read_csv('raw_data_etf.csv')
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


# Cluster Plotting
if __name__ == '__main__':
    etf_data = Pairs.getETFs(True)
    etf_data_2 = Pairs.featureEngineering(etf_data)
    clustered_series = Pairs.clustering(etf_data_2, flow='data')
    cluster_plots = Pairs.clustering(etf_data_2, flow='plot')
    





