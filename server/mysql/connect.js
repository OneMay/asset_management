var mysql = require('mysql');
var config = require('../config/config.js')
module.exports = {
    connectServer() {
        var client = mysql.createConnection({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database
        })

        return client;
    },
    //员工信息添加，code>50为管理员
    employee_add(client, data, callback) {
        var sql = `insert into AM_EMPLOYEE
            (name,sex,address,workTelExt,homeTelNo,emplEmailAddress,sociaSecurityNumber,DOB,position,salary,dateStarted,employeeNo)
            values(?,?,?,?,?,?,?,?,?,?,?,?);`
        var params = [
            data.name,
            data.sex,
            data.address,
            data.workTelExt,
            data.homeTelNo,
            data.emplEmailAddress,
            data.sociaSecurityNumber,
            data.DOB,
            data.position,
            data.salary,
            data.dateStarted,
            data.employeeNo
        ];

        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //登录
    login(client, data, callback) {
        var sql = `select *
                from AM_EMPLOYEE
                where employeeNo = ? and password= ?
            `
        var params = [
            data.employeeNo,
            data.password
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号查询
    employee_search(client, data, callback) {
        var sql = `select *
                 from AM_EMPLOYEE
                 where employeeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工姓名模糊查询
    employeeName_search(client, data, callback) {
        var sql = `select *
                  from AM_EMPLOYEE
                  where name like ?`;
        client.query(sql, ['%' + data + '%'], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所以员工编号
    employeeNo_search(client, callback) {
        var sql = `select *
                from AM_EMPLOYEE
                order by employeeNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //员工信息修改
    employee_uptate(client, data, callback) {
        var sql = `update AM_EMPLOYEE
                set name = ?, sex = ?, address = ?, workTelExt = ?, homeTelNo = ?, emplEmailAddress = ?, sociaSecurityNumber = ?, DOB = ?, position = ?, salary = ?, dateStarted = ?
                where employeeNo = ?`;
        var params = [
            data.name,
            data.sex,
            data.address,
            data.workTelExt,
            data.homeTelNo,
            data.emplEmailAddress,
            data.sociaSecurityNumber,
            data.DOB,
            data.position,
            data.salary,
            data.dateStarted,
            data.employeeNo
        ];
        client.query(sql, params, function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号删除
    employeeNo_delete(client, data, callback) {
        var sql = `delete from AM_EMPLOYEE
                    where employeeNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产类别添加
    assetCategory_add(client, data, callback) {
        var sql = `insert into AM_ASSETCATEGORY
                  (assetCategoryNo,assetCategoryDescription)
                  values(?,?)`;
        var params = [
            data.assetCategoryNo,
            data.assetCategoryDescription
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产类别编号查询
    assetCategory_search(client, data, callback) {
        var sql = `select *
                  from AM_ASSETCATEGORY
                  where assetCategoryNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有资产类别编号
    assetCategory_search_all(client, callback) {
        var sql = `select *
                  from AM_ASSETCATEGORY
                  order by assetCategoryNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产类别编号删除
    assetCategory_delete(client, data, callback) {
        var sql = `delete from AM_ASSETCATEGORY
                    where assetCategoryNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产状况添加
    status_add(client, data, callback) {
        var sql = `insert into AM_STATUS
                  (statuNo,statusDescription)
                  values(?,?)
            `;
        var params = [
            data.statuNo,
            data.statusDescription
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产状况编号查询
    status_search(client, data, callback) {
        var sql = `select *
                  from AM_STATUS
                  where statuNo = ?
            `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有资产状况编号
    status_search_all(client, callback) {
        var sql = `select *
                  from AM_STATUS
                  order by statuNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产状况编号删除
    status_delete(client, data, callback) {
        var sql = `delete from AM_STATUS
                  where statuNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有资产信息
    asset_search_all(client, callback) {
        var sql = `select *
                  from AM_ASSET
                  order by assetNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产编号查询
    assetNo_search(client, data, callback) {
        var sql = `select *
                  from AM_ASSET
                  where assetNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号查询资产
    employeeNo_asset_search(client, data, callback) {
        var sql = `select *
                  from AM_ASSET
                  where employeeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产名称查询
    assetDescription_search(client, data, callback) {
        var sql = `select *
                  from AM_ASSET
                  where assetDescription like ?`;
        client.query(sql, ['%' + data + '%'], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产添加
    asset_add(client, data, callback) {
        var sql = `insert into AM_ASSET
                 (assetDescription,serialNo,dateAcquired,purchasePrice,currentValue,dateSold,nextMaintenanceDate,employeeNo,assetCategoryNo,statuNo,assetNo)
                 values(?,?,?,?,?,?,?,?,?,?,?)
            `;
        var params = [
            data.assetDescription,
            data.serialNo,
            data.dateAcquired,
            data.purchasePrice,
            data.currentValue,
            data.dateSold,
            data.nextMaintenanceDate,
            data.employeeNo,
            data.assetCategoryNo,
            data.statuNo,
            data.assetNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产信息更新
    asset_update(client, data, callback) {
        var sql = `update AM_ASSET
                set assetDescription = ?, serialNo = ?, dateAcquired = ?, purchasePrice = ?, currentValue = ?, dateSold = ?, nextMaintenanceDate = ?, employeeNo = ?, assetCategoryNo = ?, statuNo = ?
                where assetNo = ?`;
        var params = [
            data.assetDescription,
            data.serialNo,
            data.dateAcquired,
            data.purchasePrice,
            data.currentValue,
            data.dateSold,
            data.nextMaintenanceDate,
            data.employeeNo,
            data.assetCategoryNo,
            data.statuNo,
            data.assetNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产编号删除
    asset_delete(client, data, callback) {
        var sql = `delete from AM_ASSET
                  where assetNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产业务代理全部查询
    agent_search_all(client, callback) {
        var sql = `select *
                 from AM_SERVICEAGENT
                 order by agentNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产代理编号查询
    agent_search(client, data, callback) {
        var sql = `select *
                 from AM_SERVICEAGENT
                 where agentNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产代理添加
    agent_add(client, data, callback) {
        var sql = `insert into AM_SERVICEAGENT
                 (agentName,agentStreet,agentCity,agentState,agentZipCode,agentTelNo,agentFaxNo,agentEmailAddress,agentWebAdderss,contactName,contactTelNo,contactFaxNo,contactEmailAddress,agentNo)
                 values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        var params = [
            data.agentName,
            data.agentStreet,
            data.agentCity,
            data.agentState,
            data.agentZipCode,
            data.agentTelNo,
            data.agentFaxNo,
            data.agentEmailAddress,
            data.agentWebAdderss,
            data.contactName,
            data.contactTelNo,
            data.contactFaxNo,
            data.contactEmailAddress,
            data.agentNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产代理更新
    agent_update(client, data, callback) {
        var sql = `update AM_SERVICEAGENT
                set agentName = ?, agentStreet = ?, agentCity = ?, agentState = ?, agentZipCode = ?, agentTelNo = ?, agentFaxNo = ?, agentEmailAddress = ?, agentWebAdderss = ?, contactName = ?,contactTelNo = ?,contactFaxNo = ?,contactEmailAddress = ?
                where agentNo = ?`;
        var params = [
            data.agentName,
            data.agentStreet,
            data.agentCity,
            data.agentState,
            data.agentZipCode,
            data.agentTelNo,
            data.agentFaxNo,
            data.agentEmailAddress,
            data.agentWebAdderss,
            data.contactName,
            data.contactTelNo,
            data.contactFaxNo,
            data.contactEmailAddress,
            data.agentNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产代理编号删除
    agent_delete(client, data, callback) {
        var sql = `delete from AM_SERVICEAGENT
                  where agentNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有资产维护信息
    maintenance_search_all(client, callback) {
        var sql = `select *
                 from AM_MAINTENANCE
                 order by maintenanceNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产维护编号查询
    maintenance_search(client, data, callback) {
        var sql = `select *
                 from AM_MAINTENANCE
                 where maintenanceNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产维护更新
    maintenance_update(client, data, callback) {
        var sql = `update AM_MAINTENANCE
                  set maintenanceDate = ?,maintenanceDescription = ?,maintenanceCost = ?,assetNo = ?,employeeNo = ?,agentNo = ?
                  where maintenanceNo = ?`;
        var params = [
            data.maintenanceDate,
            data.maintenanceDescription,
            data.maintenanceCost,
            data.assetNo,
            data.employeeNo,
            data.agentNo,
            data.maintenanceNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产维护添加
    maintenance_add(client, data, callback) {
        var sql = `insert into AM_MAINTENANCE
                  (maintenanceDate,maintenanceDescription,maintenanceCost,assetNo,employeeNo,agentNo,maintenanceNo)
                  values(?,?,?,?,?,?,?)`;
        var params = [
            data.maintenanceDate,
            data.maintenanceDescription,
            data.maintenanceCost,
            data.assetNo,
            data.employeeNo,
            data.agentNo,
            data.maintenanceNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //资产维护删除
    maintenance_delete(client, data, callback) {
        var sql = `delete from AM_MAINTENANCE
                  where maintenanceNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按资产编号和雇员编号查询评估
    valuation_search(client, assetNo, employeeNo, callback) {
        var sql = `select *
                 from AM_VALUATION
                 where assetNo = ? and employeeNo = ?`;
        client.query(sql, [assetNo, employeeNo], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有评估
    valuation_search_all(client, callback) {
        var sql = `select *
                 from AM_VALUATION
                 order by valuationNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按评估编号查询评估
    valuation_search_No(client, data, callback) {
        var sql = `select *
                 from AM_VALUATION
                 where valuationNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //评估录入
    valuation_add(client, data, callback) {
        var sql = `insert into AM_VALUATION
                 (valuationDate,valuationPrice,assetNo,employeeNo,valuationNo)
                 values(?,?,?,?,?)`;
        var params = [
            data.valuationDate,
            data.valuationPrice,
            data.assetNo,
            data.employeeNo,
            data.valuationNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //评估更新
    valuation_update(client, data, callback) {
        var sql = `update AM_VALUATION
                 set valuationDate = ?,valuationPrice= ?,assetNo= ?,employeeNo= ?
                 where valuationNo = ?`;
        var params = [
            data.valuationDate,
            data.valuationPrice,
            data.assetNo,
            data.employeeNo,
            data.valuationNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //评估删除
    valuation_delete(client, data, callback) {
        var sql = `delete from AM_VALUATION
                  where valuationNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    }
}