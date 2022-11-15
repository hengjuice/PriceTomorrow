import React from 'react';
import mpld3_load_lib from "./mpld3_load_lib";
import { Typography, Card } from 'antd';
import mpld3 from 'mpld3';
import { Grid } from '@mui/material';
import { useGetPairsQuery } from '../services/pairsApi';
import Loader from './Loader';
import ArgusTable from './ArgusTable';
const { Title } = Typography;

const Pairs = () => {
    const fig_name = "fig_el427345810798888193429725"
    const fig_name1 = 'pairs-bar-chart'

    const pairsColumns = [
        {
            headerName: 'No.',
            field: 'Unnamed: 0',
            width: 150,
            filter: 'agTextColumnFilter',
		},
		{
            headerName: 'Base Asset',
            field: 'base_asset',
            width: 200,
            filter: 'agTextColumnFilter',
		},
		{
            headerName: 'Compare Asset',
            field: 'compare_asset',
            width: 200,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Label',
            field: 'label',
            width: 120,
            filter: 'agTextColumnFilter',
        },
	]



    const { data, isLoading } = useGetPairsQuery();
    

    if (isLoading){
        return <Loader/>
    } else

    return (
        <>
            <div>
                <Title level={2} className="heading">ETF Pairs Trading</Title>
            </div>
            
            

            <Grid container spacing = {2}>

                <Grid item xs={12}>
                    <div className="site-card-border-less-wrapper">
                        <Card title="About this page" bordered={false}>
                            <p>Traders who are particuarly keen on Pairs Trading, need a way to find pairs that:<br/>
    
    a) Are similar in risk and behaviour<br/>
    b) Are cointegrated<br/>
    <br/>
K-Means Clustering is a Clustering technique as to which a vast array of features can have their data compared with one another and grouped into clusters of similarity. The applications of this are vast as described in the theory sections of the course.

Once ETFs pairs are grouped, they can then have cointegration calculations run against them to further help with statistical methods. Although cointegration is more a statistics method rather than Machine Learning, it is necessary to complement the clustering method.</p>
                        </Card>
                    </div><br/>
                </Grid>
                <Title level={3} className="heading">Clustering of ETFs</Title>
                <Grid item xs={12}>
                    <script>
                        mpld3_load_lib("https://d3js.org/d3.v5.js", function () {
                        mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function () {
                            mpld3.remove_figure(fig_name)
                            mpld3.draw_figure(fig_name, data[1]);
                        })
                        });
                    </script>
                    <div id={fig_name}></div>
                </Grid>
                <Title level={3} className="heading">No of Clusters</Title>
                <Grid item xs={12}>
                    <script>
                        mpld3_load_lib("https://d3js.org/d3.v5.js", function () {
                        mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function () {
                            mpld3.remove_figure(fig_name1)
                            mpld3.draw_figure(fig_name1, data[2]);
                        })
                        });
                    </script>
                    <div id={fig_name1}></div>
                </Grid>

                <Grid item xs={10}>
                    <Title level={3} className="heading">Pairs Recommendation</Title>
                    <ArgusTable 
                        rowData = {data[3]}
                        columnDefs = {pairsColumns}
                    />
                </Grid>
            </Grid>

            </>
    )
  }

export default Pairs