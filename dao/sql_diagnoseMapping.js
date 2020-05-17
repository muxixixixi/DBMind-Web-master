var sql_diagnose = {
    selectAll: 'select * from sql_diagnose',
    selectByQueryId: 'select * from sql_diagnose where query_id = ?',
    selectByTimeGap: 'select * from sql_diagnose where start_time>=? and end_time <= ? and is_slow = 1'
};

module.exports = sql_diagnose;