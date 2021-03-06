
//注册事件函数
WebUploader.Uploader.register({
    "before-send-file": "beforeSendFile",
    "before-send": "beforeSend",
    "after-send-file": "afterSendFile"
}, {
    //beforeSendFile先于beforeSend事件执行
    beforeSendFile: function(file) {
        var deferred = WebUploader.Deferred();
        (new WebUploader.Uploader()).md5File(file)
            .progress(function(percentage) {
                $('#' + file.id).find('.file-status').text('正在获取文件信息...');
            })
            .then(function(val) {
                this.fileMd5 = val;
                this.uploadFile = file;
                $.ajax({
                    type: 'POST',
                    processData: false,
                    url: taskRoutePath+"register",    
                    data:  JSON.stringify({
                        // 文件唯一表示
                        fileMd5: this.fileMd5,
                        fileName: file.name,
                        fileSize: file.size,
                        mimetype: file.type,
                        fileExt: file.ext
                    }),
                    headers: {'Content-Type':'application/json'},
                    success: function(response) {
                        if (response["content"]) {
                            $('#' + file.id).find('.file-status').text('成功获取文件信息,开始上传');
                            // console.log("上传文件注册成功开始上传");
                            deferred.resolve();
                        } else {
                            alert(response);
                            deferred.reject();
                        }
                    }
                });
            }.bind(this));
        return deferred.promise();
    }.bind(this),
    beforeSend: function(block) {
        var deferred = WebUploader.Deferred();
        $.ajax({
            type: 'POST',
            processData: false,
            url: taskRoutePath+"checkchunk",    
            data:  JSON.stringify({
                // 文件唯一表示
                fileMd5: this.fileMd5,
                // 当前分块下标
                chunk: block.chunk,
                // 当前分块大小
                chunkSize: block.end - block.start
            }),
            headers: {'Content-Type':'application/json'},
            success: function(response) {
                if (response["content"]) {
                    // 分块存在，跳过该分块
                    deferred.reject();
                } else {
                    // 分块不存在或不完整，重新发送
                    deferred.resolve();
                }
            }
        });
        this.uploader.options.formData.fileMd5 = this.fileMd5;
        this.uploader.options.formData.chunk = block.chunk;
        return deferred.promise();
    }.bind(this),
    afterSendFile: function(file) {
        console.log("taskId"+TASKID);
        $.ajax({
            type: "post",
            processData: false,
            url: taskRoutePath+"mergechunks",
            data:JSON.stringify({
                fileMd5: this.fileMd5,
                fileName: file.name,
                fileSize: file.size,
                mimetype: file.type,
                fileExt: file.ext,
                // fileExt:TASKID,
                // tId:"1212",
                taskId:TASKID
            }),
            headers: {'Content-Type':'application/json'},
            success: function(response) {
                //在这里解析合并成功结果
                if (response["content"]) {
                    //alert("上传成功")
                    saveTask();
                } else {
                    layer.alert("上传失败")
                }
            }
        });
    }.bind(this)
});
//创建webuploader实例
var uploader = WebUploader.create({
    swf: "lib/uploader/Uploader.swf", //上传文件的flash文件，浏览器不支持h5时启动flash
    server: taskRoutePath+"uploadchunk", //上传分块的服务端地址，注意跨域问题
    fileVal: "file", //文件上传域的name
    pick: {
        id: "#picker",
        multiple: false
    }, //指定选择文件的按钮容器
    auto: false, //手动触发上传
    disableGlobalDnd: false, //禁掉整个页面的拖拽功能
    chunked: true, // 是否分块上传
    chunkSize: 5 * 1024 * 1024, // 分块大小（默认5M）
    threads: 3, // 开启多个线程（默认3个）
    prepareNextFile: true, // 允许在文件传输时提前把下一个文件准备好
    chunkRetry: 2,
    dnd: "#dndArea", //拖拽区域
});
uploader.on("fileQueued", function(file) {
    this.uploadFile = file;
    this.percentage = 0;
    // fileData.push(file);

    var $list = $("#fileList");
    $list.append('<tr id="' + file.id + '" class="file-item">' +
        '<td class="file-name">' + file.name + '</td>' +
        '<td width="20%" class="file-size">' + (file.size / 1024 / 1024).toFixed(1) + 'M' + '</td>' +
        '<td width="20%" class="file-pro">0%</td>' +
        '<td class="file-status">等待上传</td>' +
        '<td width="20%" class="file-manage"><a class="stop-btn" href="javascript:;"> 暂停 </a>' +
        '<a class="restart-btn" href="javascript:;"> 开始 </a>' +
        '<a class="remove-this" href="javascript:;"> 取消</a></td>' +
        '</tr>');

    //暂停上传的文件
    $list.on('click', '.stop-btn', function() {
        uploader.stop(true);
    })
    //删除上传的文件(取消操作，这并不会重置进度，下次重传还是会从之前的进度开始)
    $list.on('click', '.remove-this', function() {
        if ($(this).parents(".file-item").attr('id') == file.id) {
            uploader.removeFile(file);
            $(this).parents(".file-item").remove();
        }
    });
    //暂停后继续开始
    $list.on('click', '.restart-btn', function() {
        // uploader.start();//用这个是错误的
        // uploader.startUpload(file);//也是错的
        //至于哪个函数才是正确的，看下源码就知道
        //正确的是：upload
        uploader.upload(file);
    });
}.bind(this));
uploader.on("beforeFileQueued", function(file) {
    //重置uploader
    this.uploader.reset()
    this.percentage = 0;
}.bind(this));
// 监控上传进度
// percentage:代表上传文件的百分比
uploader.on("uploadProgress", function(file, percentage) {
    this.percentage = Math.ceil(percentage * 100);
    console.log(percentage)
    $("td.file-pro").text("");
    var $li = $('#' + file.id).find('.file-pro'),
        $percent = $li.find('.file-progress .progress-bar');

    // 避免重复创建
    if (!$percent.length) {
        $percent = $('<div class="progress progress-striped active">' +
            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
            '<p class="per" style="line-height: 0px;">0%</p>' +
            '</div>' +
            '</div>').appendTo($li).find('.progress-bar');
    }

    $li.siblings('.file-status').text('上传中');
    //将百分比赋值到文本控件
    $li.find('.per').text((percentage * 100).toFixed(2) + '%');

    $percent.css('width', percentage * 100 + '%');
}.bind(this));
//上传失败触发
uploader.on("uploadError", function(file, reason) {
    console.log(reason)
    layer.alert("上传文件失败");
});
//上传成功触发
uploader.on("uploadSuccess", function(file, response) {
    $('#' + file.id).find('.file-status').text('已上传');
    // console.log(response)
    layer.alert("上传文件成功！");
});
//每个分块上传请求后触发
uploader.on('uploadAccept', function(file, response) {
    if (!(response)) { //分块上传失败，返回false
        console.log("分块上传失败")
        return false;
    }
});

 //  触发执行上传
function upload(){
    var isUpload = $("#title1").val();
    if(isUpload=="文件上传"){
        if(this.uploadFile && this.uploadFile.id){
            this.uploader.upload(this.uploadFile.id);
        }else{
            layer.alert("请选择文件");
        }
    }else{
        saveTask();
    }
    
   
}