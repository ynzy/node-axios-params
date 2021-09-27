const vm = new Vue({
    el: '#app',
    data: {
        buttonList: [
            {
                name: 'query参数请求',
                clickName: 'handleQuery'
            },
            {
                name: 'body参数请求',
                clickName: 'handleBody'
            },
            {
                name: 'path参数请求',
                clickName: 'handlePath'
            },
            {
                name: 'formData参数请求',
                clickName: 'handleFormData'
            },
            {
                name: '混合参数请求',
                clickName: 'handleMixRequest'
            },
        ],
        result: {},
        file: '',
    },
    methods: {
        trunClick(clickName) {
            this[clickName]()
        },
        async handleQuery() {
            console.log('handleQuery');
            const res = await axios({
                method: 'get',
                url: '/query',
                params: {
                    name: '张三'
                }
            });
            console.log(res.data);
            this.result = res.data
        },
        async handleBody() {
            console.log('handleBody');
            const res = await axios({
                method: 'post',
                url: '/body',
                data: {
                    "phoneNumber": "18131239692",
                    "veriCode": "0422"
                }
            });
            console.log(res.data);
            this.result = res.data
        },
        async handlePath() {
            console.log('handlePath');
            const res = await axios({
                method: 'get',
                url: '/path/12',
            });
            console.log(res.data);
            this.result = res.data
        },
        async onUpload(e) {
            this.file = e.target.files[0]
        },
        async handleFormData() {
            if (!this.file) return alert('请先上传文件')
            console.log('handleFormData');
            let formData = new FormData()
            formData.append('file', this.file)  // 通过append向form对象添加数据
            formData.append('name', '表单名字') // 添加form表单中其他数据
            const res = await axios({
                method: 'post',
                url: '/formData',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            });
            console.log(res.data);
            this.result = res.data
        },
        async handleMixRequest() {
            console.log('handleMixRequest');
            const res = await axios({
                method: 'post',
                url: '/mixTheRequest/12',
                params: {
                    name: '张三',
                    age: 23
                },
                data: {
                    "phoneNumber": "18131239692",
                    "veriCode": "0422"
                }
            });
            console.log(res.data);
            this.result = res.data
        }
    }
})