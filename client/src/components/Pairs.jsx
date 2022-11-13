import React from 'react'
import mpld3_load_lib from "./mpld3_load_lib";
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import mpld3, { pairs } from 'mpld3'
import { useGetPairsDataQuery, useGetPairsClusterQuery, useGetPairsBarQuery } from '../services/pairsApi';
import _json from "./clusters_pic.json"
import Loader from './Loader';
const { Title } = Typography;

const Pairs = () => {
    const fig_name = "fig_el427345810798888193429725"
    const fig_name1 = 'pairs-bar-chart'

    const pairs_data = useGetPairsDataQuery();
    const pairs_cluster = useGetPairsClusterQuery();
    const pairs_bar = useGetPairsBarQuery();

    if (pairs_cluster.status == 'pending' || pairs_data.status == 'pending'){
        return <Loader/>
    } else

    return (
        <>
            <div>
                <Title level={2} className="heading">ETF Pairs Trading</Title>
            </div>

            <div>

            <script>
                mpld3_load_lib("https://d3js.org/d3.v5.js", function () {
                mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function () {
                    mpld3.remove_figure(fig_name)
                    mpld3.draw_figure(fig_name, pairs_cluster.data);
                })
                });
            </script>
            <div id={fig_name}></div>

            <script>
                mpld3_load_lib("https://d3js.org/d3.v5.js", function () {
                mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function () {
                    mpld3.remove_figure(fig_name1)
                    mpld3.draw_figure(fig_name1, pairs_bar.data);
                })
                });
            </script>
            <div id={fig_name1}></div>
            </div>
        </>
    )
  }

export default Pairs