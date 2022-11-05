import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, DollarCircleOutlined, InfoCircleOutlined, UserSwitchOutlined } from '@ant-design/icons';
import icon from "../images/ntu.png";

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/"> BC3409 </Link>
                </Typography.Title>
                {/* <Button className = "menu-control-container">
    
                </Button> */}
            </div>
            <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<DollarCircleOutlined />}>
                <Link to="/stocks">Stocks</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
                <Link to="/forex">Forex</Link>
            </Menu.Item>
            <Menu.Item icon={<UserSwitchOutlined />}>
                <Link to="/crypto">Crypto</Link>
            </Menu.Item>
            <Menu.Item icon={<InfoCircleOutlined />}>
                <Link to="/twitter">XXX</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
                <Link to="/analytics">XXX</Link>
            </Menu.Item>
            {/* <Menu.Item icon={<FundOutlined />}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}>
                <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
                <Link to="/news">News</Link>
            </Menu.Item> */}

        </Menu>
        </div>
      )
}

export default Navbar