import React from 'react';
import mpld3_load_lib from "./mpld3_load_lib";
import { Typography } from 'antd';
import mpld3 from 'mpld3';
import { Grid } from '@mui/material';
import { useGetPairsQuery } from '../services/pairsApi';
import Loader from './Loader';
const { Title } = Typography;

const Pairs = () => {
    const fig_name = "fig_el427345810798888193429725"
    const fig_name1 = 'pairs-bar-chart'

    const { data, isLoading } = useGetPairsQuery();
    console.log(data);

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
                
                <Grid item xs={12} sx={{ml: 18}}>
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
            </Grid>

            </>
    )
  }

export default Pairs