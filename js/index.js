
function format ( d ) {
    // `d` is the original data object for the row
    console.log(d)
    return '<div class="details">'
        +'<div class="details-top">'
        +'<div class="details-left">'
        +'<p>资金用途</p>'
        +'<p>' + toEmpty(d.zjyt)
        +'</p>'
        +'</div>'
        +'<div class="details-right">'
        +'<a href="'+d.fjdesc+'" download>'
        +'<img src="../img/fujian.png" alt="附件">'
        +'<p>附件</p>'
        +'<p>华彬中心扩建项目合同.pdf</p>'
        +'</a>'
        +'</div>'
        +   '</div>'
        +   '<div class="detail_bot">'
        + '<ul class="bot_top">' +
        '<li><i>申请时间</i><p>'+toEmpty(d.sqrq)+'</p></li>' +
        '<li><i>我的历时</i><p>5天</p></li>' +
        '<li><i>申请编号</i><p>'+toEmpty(d.sqbh)+'</p></li>' +
        '<li><i>标题</i><p>'+toEmpty(d.title)+'</p></li>' +
        '<li><i>付款单位</i><p>'+toEmpty(d.fkdw)+'</p></li>' +
        '<li><i>申请部门</i><p>'+toEmpty(d.sqbmdesc)+'</p></li>' +
        '<li><i>申请人</i><p>'+toEmpty(d.sqrdesc)+'</p></li>' +
        '</ul>'
        + '<ul class="bot_bot">' +
        '<li><i>合同金额</i><p>'+showBz(d.bb, d.htje)+'</p></li>' +
        '<li><i>已付金额</i><p>'+showBz(d.bb, d.yfje) +'</p></li>' +
        '<li><i>剩余金额</i><p>'+ showBz(d.bb, d.syje) +'</p></li>' +
        '</ul>'
        + '<div class="circle circle1"></div>'
        + '<div class="circle circle2"></div>'
        + '</div>'
        +  '</div>'
        +  '</div>';
}
function unique2 (array){
    var n = []; //一个新的临时数组
    //遍历当前数组
    for(var i = 0; i < array.length; i++){
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}
function toEmpty(data) {
    if (data == '') {
        return '/'
    }
    return data
}
//  封装一个展示总计的函数
function showTotal() {
    var num = 0;
    var rmb = 0;
    var my = 0
    $("#tables").find('.plate').each(function (i) {
        var num2 = $("#tables").find('.plate').eq(i).find('.selected').find('.p1').find('.num').html() || 0;
        num = num + Number(num2);
        var rmb2 = $("#tables").find('.plate').eq(i).find('.selected').find('.p1').find('.price').attr('data-num') || 0;
        rmb = rmb + Number(rmb2);
        var my2 = $("#tables").find('.plate').eq(i).find('.selected').find('.p2').find('.price').attr('data-num') || 0;
        my = my + Number(my2);
    });
    $('#total_num').html(num);
    $('#total_Rmb').html('￥'+format_number(rmb));
    $('#total_my').html('$'+format_number(my));
}
//  页面自动滚动到顶部
// function pageScroll(){
//     //把内容滚动指定的像素数（第一个参数向右滚动的像素数，第二个参数向下滚动的像素数）
//     window.scrollBy(0,-100);
//     //延时递归调用，模拟滚动向上效果
//     scrolldelay = setTimeout('pageScroll()',100);
//     //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，
//     // 否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值
//     // 可以得到网页的真正的scrollTop值
//     var sTop=document.documentElement.scrollTop+document.body.scrollTop;
//     //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
//     if(sTop==0) clearTimeout(scrolldelay);
// }
/*
*   封装一个数字每三位加逗号的方法
* */
function format_number(n){
    var b=parseInt(n).toString();
    var len=b.length;
    if(len<=3){return b;}
    var r=len%3;
    return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
}

/*  搜索列 */
function filterColumn () {

    /*
    *   可以通过本次申请金额的人名币隐藏列实现筛选
    * */
    $.fn.dataTable.ext.search.push(
        function( settings, data, dataIndex ) {

            var max = $('#scope').attr('data-max')
            var min = $('#scope').attr('data-min')
            var age = parseFloat( data[7] ) || 0; // use data for the age column

            if ( ( isNaN( min ) && isNaN( max ) ) ||
                ( isNaN( min ) && age <= max ) ||
                ( min <= age   && isNaN( max ) ) ||
                ( min <= age   && age <= max ) )
            {
                return true;
            }
            return false;
        }
    );

    $("#tables").find('table').each(function (i) {
        var table = $("#tables").find('table').eq(i).DataTable();
        table.draw()
    })
}

/*
*   封装一个显示币种的函数
* */
function showBz(type, data) {
    if (type == '0') {
        //  币种
        if (data == '') {
            return '/'
        }
        return '￥' + data
    } else if (type == '1') {
        //  美元
        if (data == '') {
            return '/'
        }
        return '$' + data
    } else if (type == '2') {
        //  英镑
        if (data == '') {
            return '/'
        }
        return '￡' + data
    } else if (type == '3') {
        //  日元
        if (data == '') {
            return '/'
        }
        return '¥' + data
    } else if (type == '4') {
        //  欧元
        if (data == '') {
            return '/'
        }
        return '€' + data
    } else if (type == '5') {
        //  新加坡元
        if (data == '') {
            return '/'
        }
        return 'S$' + data
    } else {
        return '/'
    }
}

/*
*   封装一个根据type计算人名币值的函数
* */
function changeVal(type, data) {
    if (type == '0') {
        //  人民币
        if (data == "" || data == null) {
            data = ''
        }
        return data
    } else if (type == '1') {
        //  美元
        if (data == "" || data == null) {
            data = ''
        }
        return 2*data
    } else if (type == '2') {
        //  英镑
        if (data == "" || data == null) {
            data = ''
        }
        return 3*data
    } else if (type == '3') {
        //  日元
        if (data == "" || data == null) {
            data = ''
        }
        return 4*data
    } else if (type == '4') {
        //  欧元
        if (data == "" || data == null) {
            data = ''
        }
        return 5*data
    } else if (type == '5') {
        //  新加坡元
        if (data == "" || data == null) {
            data = ''
        }
        return 6*data
    }
}

/*
*   封装一个人民币变换成美元的函数
* */
function changeRMB(val) {
    var rate = 6;
    return val / 6;
}

$(document).ready(function() {

    var arr = [];

    $.ajax({
        type: "GET",
        url: "../data/data2.json",
        dataType: "json",
        success: function (res) {
            console.log(res)

            /*
            *   申请单位
            * */
            var arrs = [];

            for (var i in res) {

                var obj = res[i];

                for (var j in obj.list) {
                    var k = obj.list[j].sqdwdesc
                    if(k !== '') {
                        arrs.push(k);
                    }
                }

                var str = ''
                str += '<div class="plateLine"></div>' +
                    '<div class="container-fluid plate">\n' +
                    '    <div class="row-fluid redPlate">\n' +
                    '        <div class="title col-lg-1 col-md-1">\n' +
                    '            <!--Sidebar content-->\n' +
                    '            <h4>' + res[i].bk + i + '</h4>\n' +
                    '        </div>\n' +
                    '        <div class="col-lg-2 col-md-2 selected" >\n' +
                    '            <!--Body content-->\n' +
                    '            <p class="p1">已选<span class="num">0</span>项 <span class="price">￥0</span></p>\n' +
                    '            <p class="p2">当日汇率折合 <span class="price">$0</span></p>\n' +
                    '        </div>\n' +
                    '        <div class="col-lg-2 col-md-2 total" >\n' +
                    '            <!--Body content-->\n' +
                    '            <p class="p1">共<span class="num">' + res[i].allcount + '</span>项 <span class="price">￥' + res[i].dal1 + '</span></p>\n' +
                    '            <p class="p2">当日汇率折合 $<span class="meiyuan">' + res[i].dal2 + '</span></p>\n' +
                    '        </div>\n' +
                    '        <div class="col-lg-3 col-md-3">\n' +
                    '\n' +
                    '        </div>\n' +
                    '        <div class="col-lg-4 col-md-4 category">\n' +
                    '\n' +
                    '        </div>\n' +
                    '        <div class="menu show">\n' +
                    '            <span class="glyphicon glyphicon-menu-up"></span>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>\n';

                var str2 = '<table class="display" cellspacing="0" width="100%">\n' +
                    '    <thead>\n' +
                    '    <tr>\n' +
                    '        <th>序号</th>\n' +
                    '        <th>\n' +
                    '            <!--<span class="glyphicon glyphicon-unchecked"></span>-->\n' +
                    '        </th>\n' +
                    '        <th><span class="unit">申请单位</span></th>\n' +
                    '        <th><span class="use">资金用途</span></th>\n' +
                    '        <th class="iconfont sorting"><span class="totalNum">合同总金额</span></th>\n' +
                    '        <th><span class="totalNum2">合同总金额</span></th>\n' +
                    '        <th class="iconfont sorting"><span class="appliedNum">本次申请金额</span></th>\n' +
                    '        <th><span class="appliedNum2">本次申请金额</span></th>\n' +
                    '        <th><span class="payee">收款单位</span></th>\n' +
                    '        <th class="iconfont sorting"><span class="take">流程历时</span></th>\n' +
                    '        <th><span class="agent">经办人</span></th>\n' +
                    '        <th><span class="type">资金类别</span></th>\n' +
                    '        <th><span class="type2">资金类别</span></th>\n' +
                    '        <th></th>\n' +
                    '    </tr>\n' +
                    '    </thead>\n' +
                    '</table>';

                $('#tables').append(str + str2);

            }

            /*
            *   申请单位
            * */
            arrs = unique2(arrs)

            var strs = '';
            var str2 = '';
            var str3 = '';

            for (var i in arrs) {
                var obj = arrs[i];

                if (arrs.length <= 3) {
                    strs += '<dd ><a href="javascript:;">'+arrs[i]+'</a></dd>'
                } else {
                    if (i <=2) {
                        strs += '<dd ><a href="javascript:;">'+arrs[i]+'</a></dd>'
                    } else {
                        str2 = '<dd class="others">' +
                            '<a href="javascript:;">其他</a>' +
                            ' <div class="dorpdown_choose"  style="width: 100%;height: 20px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+
                            ' <span class="caret"></span>' +
                            ' </div>' +
                            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'
                        str3 += '<li><a href="javascript:;">'+arrs[i]+'</a></li></ul></dd>';

                    }
                }
            }
            $('.apply').append(strs + str2);
            $('.apply').find('.dropdown-menu').append(str3);

            $('#tables').find('table').each(function (i) {

                var table = $('#tables').find('table').eq(i).DataTable({
                    'data': res[i].list,
                    "columns": [
                        {
                            "data" : "requestid"
                        },
                        {
                            "class":          'checkbox-control',
                            "orderable":      false,
                            "data":           null,
                            "defaultContent": '',
                        },
                        {
                            "data" : "sqdwdesc",

                        },
                        {
                            "data": "zjyt",

                        },
                        {
                            "data": "htje",
                            "class" : "ZHTAM",
                        },
                        {
                            "data": "htje",
                            "class" : "ZHTAM2",
                            "bVisible" :false  //  合同金额隐藏列　人名币
                        },
                        {
                            "data": "sqje",
                            "class" : "WRBTR",
                        },
                        {
                            "data": "sqjecny",
                            "class" : "WRBTR2",
                            "bVisible" :false //    本次申请金额隐藏列 人名币
                        },
                        {
                            "data": "skdwdesc",
                        },
                        {
                            "data" : "lhour",
                            "class" : "ihour"
                        },
                        {
                            "data": "jbrdesc",
                        },
                        {
                            "data": "lx",
                            "class" : "all_kinds"
                        },
                        {
                            "data": "kmdesc",
                            "class" : "all_kinds2",
                            "bVisible" :false //    应付账款隐藏
                        },
                        {
                            "class":         'details-control',
                            "orderable":      false,
                            "data":           null,
                            "defaultContent": '详情'
                        },
                    ],
                    "aoColumnDefs": [
                        { "bSortable": false, "aTargets": [ 0,1,2,3,4,6,8,10,11 ]}
                    ],
                    "oLanguage": {//国际语言转化

                        "sZeroRecords": "对不起，查询不到任何相关数据",
                        "sEmptyTable": "未有相关数据",
                    },
                    "fixedHeader" : true,
                    "bPaginate": false, //翻页功能
                    "bLengthChange": false, //改变每页显示数据数量
                    "info": false,
                    columnDefs: [
                        {
                            targets: [ 0, 1, 2 ],
                            className: 'mdl-data-table__cell--non-numeric'
                        },
                        {
                            //设置第一列不参与搜索
                            "targets":[0],
                            "searchable":false
                        },
                        {   //第一列与第二列禁止排序
                            orderable: false,

                            targets: 0 },
                        {
                            orderable: false,

                            targets: 1
                        },
                        {
                            "targets": [ 6 ],
                            "visible": true
                        }
                    ],
                    "order": [
                        [0, null]
                    ],
                    initComplete: function () {//列筛选
                        var api = this.api();
                        var checks = $('<span class="glyphicon glyphicon-unchecked"></span>');
                        checks.appendTo($('#tables').find('table').eq(i).find('.checkbox-control'));

                        api.columns().indexes().flatten().each( function ( i ) {

                            /*
                            *   添加下拉框
                            * */
                            var column = api.column( i );

                            var select = $('<div class="dropdown" style="float: right">\n' +
                                '  <div class="" id="dropdownMenu1" style="width: 20px;height: 20px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n' +
                                '    <span class="caret"></span>\n' +
                                '  </div>\n' +
                                '  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"><li><a href="#">全部</a></li></ul></div>');

                            var select2 = $('<div class="test"><dl></dl></div>');

                            if(i ==2 || i == 3 || i== 8 ||  i == 10 || i == 11 ) {

                                select.appendTo( $(column.header()) )

                                /*
                                *   下拉框筛选事件
                                * */
                                select.on( 'click','li', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).find('a').html()
                                        );

                                        console.log(val);
                                        /*
                                        *   替换
                                        * */
                                        var that  =$(this);

                                        if(val == '全部') {
                                            val = '';
                                            that.closest('th').find('span.unit').html('申请单位')
                                            that.closest('th').find('span.use').html('资金用途')
                                            that.closest('th').find('span.payee').html('收款单位')
                                            that.closest('th').find('span.agent').html('经办人')
                                            that.closest('th').find('span.type').html('资金类别')
                                        } else {
                                            that.closest('th').find('span.unit').html(val)
                                            that.closest('th').find('span.use').html(val)
                                            that.closest('th').find('span.payee').html(val)
                                            that.closest('th').find('span.agent').html(val)
                                            that.closest('th').find('span.type').html(val)
                                        }

                                        column
                                            .search( val ? '^'+val+'$' : '', true, false )
                                            .draw();

                                        /*
                                        *   取到显示的值和 人名币 美元总计
                                        * */
                                        var trs = $(this).closest('table').find('tbody').find('tr[role="row"]');
                                        var len = trs.length;
                                        var totalRmb = 0;
                                        var totalMy = 0;

                                        trs.each(function (i) {
                                            var rmbs = trs.eq(i).attr("data-rmb") || 0;
                                            var mys = trs.eq(i).attr("data-my") || 0;
                                            totalRmb+= Number(rmbs);
                                            totalMy += Number(totalMy);
                                        });

                                        $(this).closest('.dataTables_wrapper').prev('.plate').find('.total .num').html(len);
                                        $(this).closest('.dataTables_wrapper').prev('.plate').find('.total .price').html('￥' + format_number(rmbs));
                                        $(this).closest('.dataTables_wrapper').prev('.plate').find('.total .meiyuan').html('$' + format_number(totalMy));

                                    });
                            }


                            column.data().unique().sort().each( function ( d, j ) {

                                if (d == '') {

                                } else {
                                    select.find('ul').append( '<li><a href="#">'+d+'</a></li>' );
                                }
                            } );

                        } );

                        /*
                       *   处理显示的数据
                       * */

                        //  增加已付
                        var paids = "<br /><span class='paids'>已付</span>";
                        //  增加占比
                        var occupies = "<br /><span class='occupies'>占比</span>";
                        //  增加资产类
                        var kinds = "<br /><span class='kinds'></span>";

                        $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').each(function (j) {

                            //  合同总金额
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.ZHTAM').eq(j).html(showBz(res[i].list[j].bb, format_number(res[i].list[j].htje)))
                            if (res[i].list[j].yf != "") {
                                $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.ZHTAM').eq(j).append(paids);
                                $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.ZHTAM').eq(j).find('.paids').append(res[i].list[j].yf);
                            }
                            //  本次申请金额
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).html(showBz(res[i].list[j].bb, format_number(res[i].list[j].sqje)))
                            if (res[i].list[j].zb != '') {
                                $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).append(occupies);
                                $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).find('.occupies').append(res[i].list[j].zb);
                            }

                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.all_kinds').eq(j).html(res[i].list[j].kmdesc);
                            if (res[i].list[j].lx != '') {
                                $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.all_kinds').eq(j).append(kinds)
                                $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.all_kinds').eq(j).find('.kinds').html(res[i].list[j].lx )
                            }

                            //流程历时
                            var ihour = res[i].list[j].lhour
                            if ( ihour== '-1') {
                                ihour = '刚刚'
                            } else if (Number(res[i].list[j].lhour) / 24 >= 1) {
                                ihour = res[i].list[j].lhour / 24 + '天'
                            } else {
                                ihour = res[i].list[j].lhour + '时'
                            }
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.ihour').eq(j).html(ihour)

                            //  tr添加data-id
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').eq(j).attr('data-id', res[i].list[j].requestid);
                            //  tr添加人名币
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').eq(j).attr('data-rmb', res[i].list[j].sqjecny);
                            //  tr添加美元
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').eq(j).attr('data-my', res[i].list[j].sqjeusd);
                            //  增加汇率
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').eq(j).attr('data-rate', res[i].list[j].usdlv);

                            /*
                            *   本次申请金额
                            * */
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).attr('data-rmb', res[i].list[j].sqjeusd );
                            $('#tables').find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).attr('data-my', res[i].list[j].sqjecny );

                        });


                    }
                });

                console.log(table.data())

                /*
                *   搜索
                * */

                $('#tables').find('table').eq(i).on('order.dt',

                    function(){

                    }).on('search.dt',
                    function(){

                    }).on('search.dt',
                    function(){

                    }).dataTable();

                $('.searchs').on('keyup click',function (e) {

                    var searchText = $(".searchs").val();
                    $('#tables').find('table').eq(i).DataTable().search(searchText).draw();
                });

                /*
                *   筛选
                * */
                $('.chooses').on('click','.apply .dropdown-menu li',function () {

                    var val = $(this).find('a').html();
                    $(this).closest('.others').children('a').html(val);
                    $(this).closest('.others').find('a').addClass('active').parent().siblings().find('a').removeClass('active');
                    /*
                   *   筛选
                   * */
                    var val = $(this).find('a').html();
                    $('#tables').find('table').eq(i).DataTable().column(2).search(val).draw();

                });

                $(' .chooses').on('click','.apply dd',function () {
                    if ($(this).hasClass('others')){
                        return;
                    }
                    var searchText;
                    if ($(this).hasClass('all')) {
                        searchText = '';
                    } else {
                        searchText = $(this).find('a').html();
                    }
                    $(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
                    /*
                    *   筛选
                    * */
                    $('#tables').find('table').eq(i).DataTable().column(2).search(searchText).draw();

                });

                //  范围筛选
                $(' .scope').on('click','dd',function () {

                    $(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
                    /*
                    *   筛选
                    * */
                    /*
                    *   10000以下
                    * */
                    var min = 0;
                    var max;
                    var that = $(this);
                    if ($(this).hasClass('one')){
                        min = 0;
                        max = 10000;
                    } else if ($(this).hasClass('two')) {
                        min = 10000;
                        max = 300000;
                    } else if ($(this).hasClass('three')) {
                        min = 300000;
                        max = 1000000;
                    } else if ($(this).hasClass('four')) {
                        min = 1000000;
                        max = 100000000000000000000;
                    } else {
                        min = 0;
                        max = 100000000000000000000;
                    }
                    $('#scope').attr('data-max', max);
                    $('#scope').attr('data-min', min);
                    filterColumn();
                    /*
                   *   筛选   本次申请金额的隐藏域
                   * */

                    // if ($(this).hasClass('all')) {
                    //     //  6列是隐藏列
                    //     min = 0;
                    //     max = 100000000000000000000;
                    //     filterColumn( min, max );
                    // } else {
                    //     filterColumn( min, max );
                    // }
                })

                /*
                  *   增加序列号
                  * */
                table.on('order.dt search.dt',
                    function() {
                        table.column(0, {
                            search: 'applied',
                            order: 'applied'
                        }).nodes().each(function(cell, i) {
                            cell.innerHTML = i + 1;
                        });
                    }).draw();

            });

            //  全选
            $('th.checkbox-control').on('click',function () {
                var that = $(this);

                var table = $(this).closest('table').DataTable();

                if (that.attr('data-flag') == 'true') {
                    //    取消全选
                    that.find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-unchecked');
                    that.attr('data-flag','false');
                    that.closest('table').find('tr[role=row]').find('td').css('background','#fff')
                    that.closest('table').find('tbody').find('.checkbox-control').each(function (i) {
                        var checks = $(this).closest('table').find('tbody').find('.checkbox-control').eq(i);
                        console.log(checks);
                        checks.find('span').addClass('glyphicon-unchecked').removeClass('glyphicon-ok');
                        checks.closest('tr[role=row]').removeClass('select');
                    })

                } else {
                    //    全选
                    that.find('.glyphicon').removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
                    that.attr('data-flag','true');
                    that.closest('table').find('tr[role=row]').find('td').css('background','#e9eaed')
                    that.closest('table').find('tbody').find('.checkbox-control').each(function (i) {
                        var checks = $(this).closest('table').find('tbody').find('.checkbox-control').eq(i);
                        console.log(checks)
                        checks.find('span').addClass('glyphicon-ok').removeClass('glyphicon-unchecked');
                        checks.closest('tr[role=row]').addClass('select');
                    });
                }

                //  总共选中的
                var num = table.rows('.select').data().length;
                var checksTotalRmb = 0;
                var checksTotalMy = 0;
                for (var i in table.rows('.select').data()) {
                    console.log(table.rows('.select').data()[i])
                    var obj = table.rows('.select').data()[i];
                    //     获取到人名币
                    var rmb = obj.sqjecny || 0;
                    //    获取到美元
                    var my = obj.sqjeusd || 0;

                    checksTotalRmb += Number(rmb);
                    checksTotalMy += Number(my);
                }

            //    显示
                that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').attr('data-num', checksTotalRmb);
                that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').html('￥' + format_number(checksTotalRmb));
                that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').attr('data-num', checksTotalMy);
                that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').html('$' + format_number(checksTotalMy));
                that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .num').html(num);
                showTotal();
            })

            // 除了详情以外的行点击checkbox
            $('.dataTable tbody').on('click','tr[role=row]',function (e) {
                var target = e.target;
                var that = $(this);

                var tr = $(this);

                var table = $(this).closest('table').DataTable();

                var trData = table.row( tr ).data();

                console.log(trData)

                if ($(this).hasClass('select')) {
                    //    不选
                    that.removeClass('select')
                    if (target.innerHTML == '详情' || target.innerHTML == '收起') {
                        return
                    }
                    that.find('.checkbox-control').find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-unchecked')

                    //行变色
                    that.closest('tr[role=row]').find('td').css('background' ,'#fff')

                    //  获取到总量
                    var totalNum = Number(that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .num').html());
                    //  获取到总额人名币
                    var totalRmb  = Number(that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').attr('data-num')) || 0;
                    //  获取到总额美元
                    var totalMy  = Number(that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').attr('data-num')) || 0;

                    //     获取到人名币
                    var rmb = trData.sqjecny || 0;
                    //    获取到美元
                    var my = trData.sqjeusd || 0;

                    //   赋值给总额
                    totalRmb = totalRmb - Number(rmb);
                    totalMy = totalMy - Number(my);
                    totalNum --;
                    if (totalRmb <= 0) {
                        totalRmb = 0;
                    }
                    if (totalMy <=0 ) {
                        totalMy = 0;
                    }
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').attr('data-num', totalRmb);
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').html('￥' + format_number(totalRmb));
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').attr('data-num', totalMy);
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').html('$' + format_number(totalMy));
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .num').html(totalNum);

                } else {
                    //    选择
                    that.addClass('select');
                    if (target.innerHTML == '详情' || target.innerHTML == '收起') {
                        return
                    }
                    that.find('.checkbox-control').find('.glyphicon').removeClass('glyphicon-unchecked').addClass('glyphicon-ok')
                    //行变色
                    that.closest('tr[role=row]').find('td').css('background' ,'#e9eaed');

                    //  获取到总量
                    var totalNum = Number(that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .num').html());
                    //  获取到总额人名币
                    var totalRmb  = Number(that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').attr('data-num')) || 0;
                    //  获取到总额美元
                    var totalMy  = Number(that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').attr('data-num')) || 0;

                    //     获取到人名币
                    var rmb = trData.sqjecny || 0;
                    //    获取到美元
                    var my = trData.sqjeusd || 0;

                    //   赋值给总额
                    totalRmb = totalRmb + Number(rmb);
                    totalMy = totalMy + Number(my);
                    totalNum ++;
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').attr('data-num', totalRmb);
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .price').html('￥' + format_number(totalRmb));
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').attr('data-num', totalMy);
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p2 .price').html('$' + format_number(totalMy));
                    that.closest('.dataTables_wrapper').prev('.plate').find('.selected').find('.p1 .num').html(totalNum);

                }

                showTotal();
            });

        }
    });


    var batch = 0;
    /*
    *   审批记录点击
    * */
    $('#buttons').find('button').click(function () {
        $.ajax({
            type: "GET",
            url: "../data/data3.json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                batch = response.batch;
                var recorddate  =response.recorddate;
                var recordtime = response.recordtime;
                var str1 = '';

                str1+='<div class="records"><div class="record">\n' +
                    '    <div class="title_top clearfix">\n' +
                    '        <h3 class="datatime col-lg-2 col-md-2">\n' +
                    '            <span>'+recorddate+'</span> 审批记录\n' +
                    '        </h3>\n' +
                    '        <div class="line col-lg-10 col-md-10"></div>\n' +
                    '    </div>\n' +
                    '</div>' +
                    '<div class="recod_table">'+
                    '</div>' +
                    '</div>';
                    $('#table_records').append(str1);

                var res = response.record
            //  生成记录表格头部
                for (var i in res) {

                        var obj = res[i];

                        var str = ''
                        str += '<div class="container-fluid plate">\n' +
                            '    <div class="row-fluid redPlate">\n' +
                            '        <div class="title col-lg-1 col-md-1">\n' +
                            '            <!--Sidebar content-->\n' +
                            '            <h4>' + res[i].bk + '</h4>\n' +
                            '        </div>\n' +
                            '        <div class="col-lg-2 col-md-2 total">\n' +
                            '            <!--Body content-->\n' +
                            '            <p class="p1">共<span class="num">' + res[i].allcount + '</span>项 <span class="price">￥' + res[i].dal1 + '</span></p>\n' +
                            '            <p class="p2">当日汇率折合 $<span class="meiyuan">' + res[i].dal2 + '</span></p>\n' +
                            '        </div>\n' +
                            '        <div class="col-lg-2 col-md-2 selected" >\n' +
                            '        </div>\n' +
                            '        <div class="col-lg-3 col-md-3">\n' +
                            '\n' +
                            '        </div>\n' +
                            '        <div class="col-lg-4 col-md-4 category">\n' +
                            '\n' +
                            '        </div>\n' +
                            '        <div class="menu show">\n' +
                            '            <span class="glyphicon glyphicon-menu-up"></span>\n' +
                            '        </div>\n' +
                            '    </div>\n' +
                            '</div>\n';

                        var str2 = '<table class="display" cellspacing="0" width="100%">\n' +
                            '    <thead>\n' +
                            '    <tr>\n' +
                            '        <th >序号</th>\n' +
                            '        <th>' +
                            '记录' +
                            '        </th>' +
                            '        <th><span class="unit">申请单位</span></th>\n' +
                            '        <th><span class="use">资金用途</span></th>\n' +
                            '        <th class="iconfont sorting"><span class="totalNum">合同总金额</span></th>\n' +
                            '        <th><span class="totalNum2">合同总金额</span></th>\n' +
                            '        <th class="iconfont sorting"><span class="appliedNum">本次申请金额</span></th>\n' +
                            '        <th><span class="appliedNum2">本次申请金额</span></th>\n' +
                            '        <th><span class="payee">收款单位</span></th>\n' +
                            '        <th class="iconfont sorting"><span class="take">流程历时</span></th>\n' +
                            '        <th><span class="agent">经办人</span></th>\n' +
                            '        <th><span class="type">资金类别</span></th>\n' +
                            '        <th><span class="type2">资金类别</span></th>\n' +
                            '        <th></th>\n' +
                            '    </tr>\n' +
                            '    </thead>\n' +
                            '</table>';

                        $('#table_records').find('.recod_table').last().append(str + str2);

                    }

            //        生成表格内容
                $('#table_records').find('.recod_table').last().find('table').each(function (i) {
                    var table = $('#table_records').find('.recod_table').last().find('table').eq(i).DataTable({
                        'data': res[i].list,
                        "columns": [
                            {
                                "data" : "requestid"
                            },
                            {
                                "class":          'suggeston',
                                "data":           null,
                                "defaultContent": '同意',
                            },
                            {
                                "data" : "sqdwdesc",

                            },
                            {
                                "data": "zjyt",

                            },
                            {
                                "data": "htje",
                                "class" : "ZHTAM",
                            },
                            {
                                "data": "htje",
                                "class" : "ZHTAM2",
                                "bVisible" :false  //  合同金额隐藏列　人名币
                            },
                            {
                                "data": "sqje",
                                "class" : "WRBTR",
                            },
                            {
                                "data": "sqjecny",
                                "class" : "WRBTR2",
                                "bVisible" :false //    本次申请金额隐藏列 人名币
                            },
                            {
                                "data": "skdwdesc",
                            },
                            {
                                "data" : "lhour",
                                "class" : "ihour"
                            },
                            {
                                "data": "jbrdesc",
                            },
                            {
                                "data": "lx",
                                "class" : "all_kinds"
                            },
                            {
                                "data": "kmdesc",
                                "class" : "all_kinds2",
                                "bVisible" :false //    应付账款隐藏
                            },
                            {
                                "class":         'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": '详情'
                            },
                        ],
                        "aoColumnDefs": [
                            { "bSortable": false, "aTargets": [ 0,1,2,3,4,6,8,10,11 ]}
                        ],
                        "oLanguage": {//国际语言转化

                            "sZeroRecords": "对不起，查询不到任何相关数据",
                            "sEmptyTable": "未有相关数据",
                        },
                        fixedHeader: true,
                        "bPaginate": false, //翻页功能
                        "bLengthChange": false, //改变每页显示数据数量
                        "info": false,
                        columnDefs: [
                            {
                                targets: [ 0, 1, 2 ],
                                className: 'mdl-data-table__cell--non-numeric'
                            },
                            {
                                //设置第一列不参与搜索
                                "targets":[0],
                                "searchable":false
                            },
                            {   //第一列与第二列禁止排序
                                orderable: false,

                                targets: 0 },
                            {
                                orderable: false,

                                targets: 1
                            },
                            {
                                "targets": [ 6 ],
                                "visible": true
                            }
                        ],
                        "order": [
                            [0, null]
                        ],
                        initComplete: function () {//列筛选
                            var api = this.api();

                            api.columns().indexes().flatten().each( function ( i ) {

                                /*
                                *   添加下拉框
                                * */
                                var column = api.column( i );

                                var select = $('<div class="dropdown" style="float: right">\n' +
                                    '  <div class="" id="dropdownMenu1" style="width: 20px;height: 20px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n' +
                                    '    <span class="caret"></span>\n' +
                                    '  </div>\n' +
                                    '  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"><li><a href="#">全部</a></li></ul></div>');

                                var select2 = $('<div class="test"><dl></dl></div>');

                                if(i ==2 || i == 3 || i== 8 ||  i == 10 || i == 11 ) {

                                    select.appendTo( $(column.header()) )

                                    /*
                                    *   下拉框筛选事件
                                    * */
                                    select.on( 'click','li', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).find('a').html()
                                        );

                                        console.log(val);
                                        /*
                                        *   替换
                                        * */
                                        var that  =$(this);

                                        if(val == '全部') {
                                            val = '';
                                            that.closest('th').find('span.unit').html('申请单位')
                                            that.closest('th').find('span.use').html('资金用途')
                                            that.closest('th').find('span.payee').html('收款单位')
                                            that.closest('th').find('span.agent').html('经办人')
                                            that.closest('th').find('span.type').html('资金类别')
                                        } else {
                                            that.closest('th').find('span.unit').html(val)
                                            that.closest('th').find('span.use').html(val)
                                            that.closest('th').find('span.payee').html(val)
                                            that.closest('th').find('span.agent').html(val)
                                            that.closest('th').find('span.type').html(val)
                                        }

                                        column
                                            .search( val ? '^'+val+'$' : '', true, false )
                                            .draw();

                                        /*
                                        *   取到显示的值和 人名币 美元总计
                                        * */
                                        var trs = $(this).closest('table').find('tbody').find('tr[role="row"]');
                                        var len = trs.length;
                                        var totalRmb = 0;
                                        var totalMy = 0;

                                        trs.each(function (i) {
                                            var rmbs = trs.eq(i).attr("data-rmb") || 0;
                                            var mys = trs.eq(i).attr("data-my") || 0;
                                            totalRmb+= Number(rmbs);
                                            totalMy += Number(totalMy);
                                        });

                                        $(this).closest('.dataTables_wrapper').prev('.plate').find('.total .num').html(len);
                                        $(this).closest('.dataTables_wrapper').prev('.plate').find('.total .price').html('￥' + format_number(rmbs));
                                        $(this).closest('.dataTables_wrapper').prev('.plate').find('.total .meiyuan').html('$' + format_number(totalMy));

                                    });
                                }


                                column.data().unique().sort().each( function ( d, j ) {

                                    if (d == '') {

                                    } else {
                                        select.find('ul').append( '<li><a href="#">'+d+'</a></li>' );
                                    }
                                } );

                            } );

                            /*
                           *   处理显示的数据
                           * */

                            //  增加已付
                            var paids = "<br /><span class='paids'>已付</span>";
                            //  增加占比
                            var occupies = "<br /><span class='occupies'>占比</span>";
                            //  增加资产类
                            var kinds = "<br /><span class='kinds'></span>";

                            $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').each(function (j) {

                                //  合同总金额
                                $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.ZHTAM').eq(j).html(showBz(res[i].list[j].bb, format_number(res[i].list[j].htje)))
                                if (res[i].list[j].yf != "") {
                                    $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.ZHTAM').eq(j).append(paids);
                                    $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.ZHTAM').eq(j).find('.paids').append(res[i].list[j].yf);
                                }
                                //  本次申请金额
                                $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).html(showBz(res[i].list[j].bb, format_number(res[i].list[j].sqje)))
                                if (res[i].list[j].zb != '') {
                                    $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).append(occupies);
                                    $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.WRBTR').eq(j).find('.occupies').append(res[i].list[j].zb);
                                }

                                $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.all_kinds').eq(j).html(res[i].list[j].kmdesc);
                                if (res[i].list[j].lx != '') {
                                    $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.all_kinds').eq(j).append(kinds)
                                    $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.all_kinds').eq(j).find('.kinds').html(res[i].list[j].lx )
                                }

                                //流程历时
                                var ihour = res[i].list[j].lhour
                                if ( ihour== '-1') {
                                    ihour = '刚刚'
                                } else if (Number(res[i].list[j].lhour) / 24 >= 1) {
                                    ihour = res[i].list[j].lhour / 24 + '天'
                                } else {
                                    ihour = res[i].list[j].lhour + '时'
                                }
                                $('#table_records').find('.recod_table').last().find('table').eq(i).find('tbody').find('tr[role=row]').find('.ihour').eq(j).html(ihour)

                            });


                        }
                    })

                    /*
                      *   增加序列号
                      * */
                    table.on('order.dt search.dt',
                        function() {
                            table.column(0, {
                                search: 'applied',
                                order: 'applied'
                            }).nodes().each(function(cell, i) {
                                cell.innerHTML = i + 1;
                            });
                        }).draw();

                });

            }
        })
    });

    //  添加行的附加信息
    $('body').on('click', '.dataTables_wrapper tbody td.details-control', function () {

        var table = $(this).closest('table').DataTable();
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        $(this).text('详情');

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            tr.next('tr').find('td').removeClass('detail2');
        }
        else {
            // Open this row
            $(this).text('收起')
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
            tr.next('tr').find('td').addClass('detail2');
        }
    });

    //  下拉按钮点击
    $('body').on('click','.plate .menu',function () {
        var that = $(this);

        if ($(this).hasClass('show')) {
            that.removeClass('show');
            that.closest('.plate').addClass('zhankai');
            that.closest('.plate').next('.dataTables_wrapper').slideDown()
            that.find('span.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up')
            that.find('span.glyphicon').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down')
        } else {
            that.closest('.plate').removeClass('zhankai');
            that.addClass('show');
            that.closest('.plate').next('.dataTables_wrapper').slideUp()
            that.find('span.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up')

        }
    });

    var flag = 0;
    var flag2 = 0;
    var flag3 = 0;
    //  本次申请金额排序
    $('body').on('click', 'thead .WRBTR', function () {

        var table = $(this).closest('table').DataTable();

        console.log(table.column( '7' ).data())

        if (flag == 0) {
            //    降序
            // $(this).addClass('iconfont sorting')
            table.column( '7')
                .order('desc')
                .draw();
            flag = 1
        } else {
            //    升序
            table.column( '6')
                .order('asc')
                .draw();
            flag = 0;
        }

    })
    //    流程历时排序
    $('body').on('click', 'thead .ihour', function () {

        var table = $(this).closest('table').DataTable();

        if (flag2 == 0) {
            //    降序
            // $(this).addClass('iconfont sorting')
            table.column( '9')
                .order('desc')
                .draw();
            flag2 = 1;
        } else {
            //    升序
            table.column( '9')
                .order('asc')
                .draw();
            flag2 = 0;
        }

    })
    //    合同总金额排序
    $('body').on('click', 'thead .ZHTAM', function () {
        var table = $(this).closest('table').DataTable();

        console.log( table.column( '4').data())

        if (flag3 == 0) {
            //    降序
            // $(this).addClass('iconfont sorting')
            table.column( '4')
                .order('desc')
                .draw();
            flag3 = 1;
        } else {
            //    升序
            table.column( '4')
                .order('asc')
                .draw();
            flag3 = 0;
        }
    });

    /*
    *   排序更换图标
    * */
    $('.sorting').each(function (i) {
        $('.sorting').eq(i).addClass('iconfont')
    });

    /*
    *   同意驳回 获取页面选中的元素
    * */
    $('.chooses').on('click','.reject',function () {
       //   驳回点击
        var arr = [];
       // 遍历table
        $('#tables').find('table').each(function (i) {
            var tables = $('#tables').find('table').eq(i).DataTable();
        //    遍历tr
            $('#tables').find('table').eq(i).find('tbody tr.select').each(function (j) {
                var trs = $('#tables').find('table').eq(i).find('tbody tr.select').eq(j);
                var trDatas = tables.row( trs ).data();
                arr.push(trDatas);
            })
        });
        console.log(arr);
        if (arr.length == 0) {
            $('body').append(
                '<div class="alert alert-warning" style="position: fixed; right: 0; top: 0;">\n' +
                '    <a href="#" class="close" data-dismiss="alert">\n' +
                '        &times;\n' +
                '    </a>\n' +
                '    <strong>提示！</strong>至少选择一项需要驳回的项\n' +
                '</div>');

        } else {
        //    弹出模态框
            $('#modelBtn').click();
        }
    });

    $('.chooses').on('click','.consent',function () {
        //   同意点击
        var arr = [];
        // 遍历table
        $('#tables').find('table').each(function (i) {
            var tables = $('#tables').find('table').eq(i).DataTable();
            //    遍历tr
            $('#tables').find('table').eq(i).find('tbody tr.select').each(function (j) {
                var trs = $('#tables').find('table').eq(i).find('tbody tr.select').eq(j);
                var trDatas = tables.row( trs ).data();
                arr.push(trDatas);
            })
        });
        console.log(arr);
        if (arr.length == 0) {
            $('body').append(
                '<div class="alert alert-warning" style="position: fixed; right: 0; top: 0;">\n' +
                '    <a href="#" class="close" data-dismiss="alert">\n' +
                '        &times;\n' +
                '    </a>\n' +
                '    <strong>提示！</strong>至少选择一项需要同意的项\n' +
                '</div>');
        }
    });

    /*
    *   板块固定到顶部
    * */
    // $(window).scroll(function(){
    //     //获取滚动条的滑动距离
    //      var scroH = $(this).scrollTop();
    //
    //     /*  板块的高度
    //     * */
    //     var height = $('#tables').find('.plate').eq(0).height();
    //     /*
    //     *   板块距离顶部的距离
    //     * */
    //     // var top = $('#tables').find('.plate').eq(0).offset().top;
    //     var top = $('#header').height() + $('.chooses').height();
    //
    //     if (scroH >= top) {
    //     //    第一个板块
    //     //    滚动到顶部固定
    //         $('#tables').find('.plate').eq(0).addClass('fixed');
    //         $('#tables').find('.plate').eq(0).next().css('paddingTop', height)
    //
    //         /*
    //         *
    //         *   表头固定
    //         * */
    //     } else {
    //         $('#tables').find('.plate').eq(0).removeClass('fixed');
    //         $('#tables').find('.plate').eq(0).next().css('paddingTop', 0)
    //     }
    // })

    $(window).scroll(function() {
        //获取滚动条的滑动距离
        var scroH = $(this).scrollTop();

        //  板块的高度
        var height = $('#tables').find('.plate').eq(0).height();
        //  头部部分的高度
        var top = $('#header').height() + $('.chooses').height();

        var arr = [];
        $('#tables').find('.plate').each(function (i) {
            arr.push($('#tables').find('.plateLine').eq(i).offset().top)
        });

        //  滚动到大于审批记录的位置
        var recordTop = $('#table_records').offset().top;

        console.log(arr);
        var tableIndex = 0;

        console.log(scroH);

        for(var i in arr) {

            // console.log("2" + arr[arr.length - 1] < scroH);
            if (arr[i] > scroH + height || arr[arr.length - 1] < scroH) {
                // console.log(i)
                tableIndex = Number(i) - 1 ;
                // tabindex就是滚动到第几个的位置
                if(arr[arr.length - 1] < scroH) {
                    tableIndex = arr.length - 1;
                }

                if ((Number(scroH) + height * 2) > recordTop ) {
                    $('#tables').find('.plate').last().removeClass('fixed').siblings().removeClass('fixed');
                    $('#tables').find('.plate').last().next().siblings('.dataTables_wrapper').css('paddingTop', 0);
                    $('#tables').find('.plate').siblings('.dataTables_wrapper').css('paddingTop', 0);
                    return;
                }

                if(tableIndex >= 0) {
                    /*  必须是展开情况下*/
                    if ($('#tables').find('.plate').eq(tableIndex).hasClass('zhankai')){

                        // $("html,body").animate({"scrollTop": -1000 }, 1000);
                        // window.scrollBy(0, height);
                        $('#tables').find('.plate').eq(tableIndex).animate({scrollTop:0}, 1000);

                        $('#tables').find('.plate').eq(tableIndex).addClass('fixed');
                        $('#tables').find('.plate').eq(tableIndex).next().css('paddingTop', height);
                        $('#tables').find('.plate').eq(tableIndex).addClass('fixed').siblings('.plate').removeClass('fixed');
                        $('#tables').find('.plate').eq(tableIndex).next().siblings('.dataTables_wrapper').css('paddingTop', 0);
break;
                    } else {
                        // $('#tables').find('.plate').removeClass('fixed');
                        // $('#tables').find('.plate').next().css('paddingTop', height);
                        // $('#tables').find('.plate').siblings('.dataTables_wrapper').css('paddingTop', 0);
                        $('#tables').find('.plate').eq(tableIndex).siblings('.plate').removeClass('fixed');
                        $('#tables').find('.plate').eq(tableIndex).siblings('.plate').next().css('paddingTop', height);
                        $('#tables').find('.plate').eq(tableIndex).siblings('.dataTables_wrapper').css('paddingTop', 0);
                    }

                } else {
                    $('#tables').find('.plate').removeClass('fixed');
                    $('#tables').find('.plate').next().css('paddingTop', height);
                    $('#tables').find('.plate').siblings('.dataTables_wrapper').css('paddingTop', 0);
                }
                break;
            }
        }


        console.log(tableIndex);

        // if (i ==0 && tableIndex > scroH ) {
        // //  第一个板块的位置 并且要小于第四个板块....
        //     $('#tables').find('.plate').eq(0).addClass('fixed');
        //     $('#tables').find('.plate').eq(0).next().css('paddingTop', height)
        // } else {
        //     $('#tables').find('.plate').eq(0).removeClass('fixed');
        //     $('#tables').find('.plate').eq(0).next().css('paddingTop', 0)
        // }







        // $('#tables').find('.plate').each(function (i) {
        //     if ($('#tables').find('.plate').eq(0).hasClass('fixed')) {
        //         if (i > 0) {
        //             //    不是第一个
        //             //    滚动到top = plate高度的位置
        //         }
        //     }
        //
        // })

        // if (flag == 0 || flag2 == 0) {
        //
        // } else {
        //     //    不是第一个板块 滚动距离到了顶部 + plate的高度 就固定
        //     if (scroH >= top) {
        //         $('#tables').find('.plate').eq(i - 1).removeClass('fixed');
        //         $('#tables').find('.plate').eq(i).addClass('fixed');
        //         $('#tables').find('.plate').eq(i).next().css('paddingTop', height)
        //         $('#tables').find('.plate').eq(i - 1).next().css('paddingTop', 0)
        //     }
        //     $('#tables').find('.plate').eq(i).addClass('fixed');
        // }
    })

        /*
        *   板块距离顶部的距离
        * */


});
