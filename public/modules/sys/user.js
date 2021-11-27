$(function () {

    function addButtonFunc(value, row, index) {
        return [
                '<div id="editButton"   class="badge badge-success m-1"><i class="far fa-edit mr-1"></i>编辑</div>',
                '<div id="deleteButton"  class="badge badge-danger m-1"> <i class="fas fa-times mr-1"></i>删除</div>',
            ].join('');
    }

    window.operateEvents = {
        'click #editButton': function (e, value, row, index) {
            vm.update(row.Id);
        }, 'click #deleteButton': function (e, value, row, index) {
            vm.del(row.Id);
        }
    };

    $('#table').bootstrapTable({
        url: baseURL + 'sys/user/page',
        method: "GET",
        striped: true,
        cache: false,
        pagination: true,
        pageList: [20, 40, 60, 100],
        pageSize: 20,
        pageNumber: 1,
        sortName: "id",
        sortOrder: "desc",
        sidePagination: 'server',
        search: false,
        uniqueId: "Id",
        silent: true,
        classes: "table table-hover",
        paginationHAlign: "left",
        paginationDetailHAlign: "right",
        queryParams: queryParams,
        responseHandler: function (res) {
            console.log('=== responseHandler ===')
            console.log(res)
            return {
                "total": res.data.form.TotalSize,
                "rows": res.data.list
            };
        },
        onLoadSuccess: function (res) {
            console.log('=== onLoadSuccess ===')
            console.log(res)
        },
        onLoadError: function (res) {
            console.log('=== onLoadError ===')
            console.log(res)
            console.log('=== queryParams ===')
            console.log(queryParams)
            alert("数据加载失败！");
        },
        columns: [{
                checkbox: true,
                visible: true
                },
                 {
                    field: 'Id',
                    title: 'ID'
                },
                 {
                    field: 'Username',
                    title: '用户名'
                },
                 {
                    field: 'Mobile',
                    title: '手机号'
                },
                {
                    field: 'operate',
                    title: '操作',
                    events: operateEvents,
                    formatter: addButtonFunc 
                }
            ]
    });

    function queryParams(params) {
        var temp = {
            offset: params.offset,
            limit: params.limit,
            search: $(".search-input").val(),
            rows: params.limit,
            page: (params.offset / params.limit) + 1,
            sort: params.sort,
            sortOrder: params.order
        };
        return temp;
    };
    $("#search-btn").click(function () {
        $('#table').bootstrapTable('refresh');
    });

});

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        sysuser:{
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.sysuser= {};
         },
        update: function (Id) {
            if (Id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.getInfo(Id)
        },
    saveOrUpdate: function (event) {
        $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function () {
            var url = vm.sysuser.Id ==null ? "sys/user/save" : "sys/user/update";
            console.log(vm.sysuser)
            $.ajax({
                type: "POST",
                url: baseURL + url,
                data: vm.sysuser,
                success: function (r) {
                    if (r.code === 0) {
                        swal({
                            text: "操作成功",
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                        });
                        vm.reload();
                        $('#btnSaveOrUpdate').button('reset');
                        $('#btnSaveOrUpdate').dequeue();
                    } else {
                        swal({
                            text: r.msg,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                        });
                        $('#btnSaveOrUpdate').button('reset');
                        $('#btnSaveOrUpdate').dequeue();
                    }
                }
        })
            ;
        });
    },
    del: function (Id) {
        var Ids = [Id];
        var lock = false;
        top.swal({
        title: "确定要删除该记录?",
        icon: "warning",
        buttons: ["取消", "确定"],
        closeModal: true,
    }).then((isConfirm) => {
            if (isConfirm) {
            top.swal.close();
            if (!lock) {
                lock = true;
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/user/delete",
                    data: {ids: Ids},
                    success: function (r) {
                        if (r.code == 0) {
                            swal({
                                text: "删除成功",
                                icon: "success",
                                buttons: false,
                                timer: 2000,
                            });
                            $('#table').bootstrapTable('refresh');
                        } else {
                            swal({
                                text: r.msg,
                                icon: "error",
                                buttons: false,
                                timer: 2000,
                            });
                        }
                    }
                });
            }
        }else {
            top.swal.close();
        }
    });
    },
    bulkdel: function (event) {
        var Ids = getSelectedRows();
        if (Ids == null || Ids.length == 0) {
            return;
        }
        var lock = false;
        top.swal({
            title: "确定要删除该记录?",
            icon: "warning",
            buttons: ["取消", "确定"],
            closeModal: true,
        }).then((isConfirm) => {
            if (isConfirm) {
                top.swal.close();
                if (!lock) {
                    lock = true;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/user/delete",
                        data: {ids: Ids},
                        success: function (r) {
                            if (r.code == 0) {
                                swal({
                                    text: "删除成功",
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000,
                                });
                                $('#table').bootstrapTable('refresh');
                            } else {
                                swal({
                                    text: r.msg,
                                    icon: "error",
                                    buttons: false,
                                    timer: 2000,
                                });
                            }
                        }
                    });
                }
            }else {
                top.swal.close();
            }
        });
    },
    getInfo: function (Id) {
        $.get(baseURL + "sys/user/get/" +Id, function (r) {
            vm.sysuser= r.data;
            vm.sysuser.Password = null;
        });
    },
    reload: function (event) {
        vm.showList = true;
        $('#table').bootstrapTable('refresh');
    }
}
})
;