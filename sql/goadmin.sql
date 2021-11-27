-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-11-26 14:32:07
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `goadmin`
--

-- --------------------------------------------------------

--
-- 表的结构 `sys_config`
--

CREATE TABLE `sys_config` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `param_key` varchar(50) DEFAULT NULL COMMENT '参数名',
  `param_value` varchar(2000) DEFAULT NULL COMMENT '参数值',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态   0：隐藏   1：显示'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统参数';

-- --------------------------------------------------------

--
-- 表的结构 `sys_oss`
--

CREATE TABLE `sys_oss` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `url` varchar(200) DEFAULT NULL COMMENT '地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文件管理';

-- --------------------------------------------------------

--
-- 表的结构 `sys_user`
--

CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `salt` varchar(20) DEFAULT NULL COMMENT '秘钥',
  `mobile` varchar(100) DEFAULT NULL COMMENT '手机号',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态  0：禁用   1：正常'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统用户';

--
-- 转存表中的数据 `sys_user`
--

INSERT INTO `sys_user` (`id`, `username`, `password`, `salt`, `mobile`, `create_time`, `update_time`, `status`) VALUES
(1, 'admin', 'bd4741b8ffc856692d120cce72e6a904', '4572371139971416064', '13512458216', '2019-12-25 16:28:27', '2021-11-25 21:51:08', 1);

--
-- 转储表的索引
--

--
-- 表的索引 `sys_config`
--
ALTER TABLE `sys_config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `param_key` (`param_key`);

--
-- 表的索引 `sys_oss`
--
ALTER TABLE `sys_oss`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_user`
--
ALTER TABLE `sys_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sys_config`
--
ALTER TABLE `sys_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID';

--
-- 使用表AUTO_INCREMENT `sys_oss`
--
ALTER TABLE `sys_oss`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID';

--
-- 使用表AUTO_INCREMENT `sys_user`
--
ALTER TABLE `sys_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
