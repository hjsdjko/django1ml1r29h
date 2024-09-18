<template>
<div :style='{"minHeight":"500px","padding":"20px 20px 40px","margin":"0px auto","borderColor":"#ddd","background":"#fff","borderWidth":"0px","width":"1200px","position":"relative","borderStyle":"solid"}'>
    <el-form
	  :style='{"border":"1px solid #ddd","padding":"40px 0 50px","alignItems":"flex-start","flexWrap":"wrap","background":"#fff","display":"flex","width":"100%","position":"relative"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
    >
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="菜品名称" prop="caipinmingcheng">
            <el-input v-model="ruleForm.caipinmingcheng" 
                placeholder="菜品名称" clearable :disabled=" false  ||ro.caipinmingcheng"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}'  label="菜品分类" prop="caipinfenlei">
            <el-select v-model="ruleForm.caipinfenlei" placeholder="请选择菜品分类" :disabled=" false  ||ro.caipinfenlei" >
              <el-option
                  v-for="(item,index) in caipinfenleiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="菜品图片" v-if="type!='cross' || (type=='cross' && !ro.caipintupian)" prop="caipintupian">
            <file-upload
            tip="点击上传菜品图片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.caipintupian?ruleForm.caipintupian:''"
            @change="caipintupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' class="upload" v-else label="菜品图片" prop="caipintupian">
                <img v-if="ruleForm.caipintupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.caipintupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.caipintupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="菜品特色" prop="caipintese">
            <el-input v-model="ruleForm.caipintese" 
                placeholder="菜品特色" clearable :disabled=" false  ||ro.caipintese"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="单次限购" prop="onelimittimes">
            <el-input v-model.number="ruleForm.onelimittimes" 
                placeholder="单次限购" clearable :disabled=" false  ||ro.onelimittimes"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="库存信息" prop="alllimittimes">
            <el-input v-model.number="ruleForm.alllimittimes" 
                placeholder="库存信息" clearable :disabled=" false  ||ro.alllimittimes"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="积分" prop="jf">
            <el-input v-model.number="ruleForm.jf" 
                placeholder="积分" clearable :disabled=" false  ||ro.jf"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="价格" prop="price">
			<el-input-number v-model="ruleForm.price" placeholder="价格" :readonly="ro.price"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"0px","margin":"0 0 20px","background":"none","display":"inline-block"}' label="菜品详情" prop="caipinxiangqing">
            <editor 
                :style='{"minHeight":"250px","padding":"0","margin":"0","borderColor":"#eee","backgroundColor":"none","borderRadius":"0","borderWidth":"1px","width":"96%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.caipinxiangqing" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"width":"100%","padding":"0","margin":"20px 0 0","textAlign":"center"}'>
        <el-button :style='{"border":"0px solid #eccc19","cursor":"pointer","padding":"0","margin":"0 20px 0 0","color":"#fff","borderRadius":"0px","background":"#b4a078","width":"150px","lineHeight":"40px","fontSize":"16px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"0px solid #ccc","cursor":"pointer","padding":"0","margin":"0","color":"#fff","borderRadius":"0px","background":"#999","width":"150px","lineHeight":"40px","fontSize":"16px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				caipinmingcheng : false,
				caipinfenlei : false,
				caipintupian : false,
				caipintese : false,
				onelimittimes : false,
				alllimittimes : false,
				caipinxiangqing : false,
				clicktime : false,
				discussnum : false,
				jf : false,
				price : false,
				vipprice : false,
				storeupnum : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          caipinmingcheng: '',
          caipinfenlei: '',
          caipintupian: '',
          caipintese: '',
          onelimittimes: Number('0') ,
          alllimittimes: Number('10') ,
          caipinxiangqing: '',
          clicktime: '',
          discussnum: '',
          jf: '',
          price: '',
          vipprice: '',
          storeupnum: '',
        },
        caipinfenleiOptions: [],


        rules: {
          caipinmingcheng: [
            { required: true, message: '菜品名称不能为空', trigger: 'blur' },
          ],
          caipinfenlei: [
            { required: true, message: '菜品分类不能为空', trigger: 'blur' },
          ],
          caipintupian: [
          ],
          caipintese: [
          ],
          onelimittimes: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          alllimittimes: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          caipinxiangqing: [
          ],
          clicktime: [
          ],
          discussnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          jf: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' },
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          vipprice: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          storeupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
        },
		centerType: false,
      };
    },
    computed: {



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='caipinmingcheng'){
              this.ruleForm.caipinmingcheng = obj[o];
              this.ro.caipinmingcheng = true;
              continue;
            }
            if(o=='caipinfenlei'){
              this.ruleForm.caipinfenlei = obj[o];
              this.ro.caipinfenlei = true;
              continue;
            }
            if(o=='caipintupian'){
              this.ruleForm.caipintupian = obj[o].split(",")[0];
              this.ro.caipintupian = true;
              continue;
            }
            if(o=='caipintese'){
              this.ruleForm.caipintese = obj[o];
              this.ro.caipintese = true;
              continue;
            }
            if(o=='onelimittimes'){
              this.ruleForm.onelimittimes = obj[o];
              this.ro.onelimittimes = true;
              continue;
            }
            if(o=='alllimittimes'){
              this.ruleForm.alllimittimes = obj[o];
              this.ro.alllimittimes = true;
              continue;
            }
            if(o=='caipinxiangqing'){
              this.ruleForm.caipinxiangqing = obj[o];
              this.ro.caipinxiangqing = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='discussnum'){
              this.ruleForm.discussnum = obj[o];
              this.ro.discussnum = true;
              continue;
            }
            if(o=='jf'){
              this.ruleForm.jf = obj[o];
              this.ro.jf = true;
              continue;
            }
            if(o=='price'){
              this.ruleForm.price = obj[o];
              this.ro.price = true;
              continue;
            }
            if(o=='vipprice'){
              this.ruleForm.vipprice = obj[o];
              this.ro.vipprice = true;
              continue;
            }
            if(o=='storeupnum'){
              this.ruleForm.storeupnum = obj[o];
              this.ro.storeupnum = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/caipinfenlei/caipinfenlei', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.caipinfenleiOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`caipinxinxi/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {
			if(this.ruleForm.price<0){
				this.$message.error("价格不能输入负数");
				return
			}
			if(this.ruleForm.vipprice<0){
				this.$message.error("VIP价格不能输入负数");
				return
			}
			if(this.ruleForm.alllimittimes<0){
				this.$message.error("库存不能输入负数");
				return
			}
			if(this.ruleForm.onelimittimes<0){
				this.$message.error("单次购买不能输入负数");
				return
			}
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('caipinxinxi/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`caipinxinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.$http.post(`caipinxinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		// 返回
		back() {
			this.$router.go(-1);
		},
      caipintupianUploadChange(fileUrls) {
          this.ruleForm.caipintupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 150px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 150px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #ddd;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 200px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #ddd;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 200px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px;
	  color: #666;
	  background: none;
	  width: auto;
	  font-size: 14px;
	  border-color: #ddd;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px 0 30px;
	  color: #666;
	  background: none;
	  width: auto;
	  font-size: 14px;
	  border-color: #ddd;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  cursor: pointer;
	  color: #999;
	  font-size: 24px;
	  border-color: #ddd;
	  line-height: 54px;
	  border-radius: 2px;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  text-align: center;
	  min-width: 150px;
	  height: 54px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  cursor: pointer;
	  color: #999;
	  font-size: 24px;
	  border-color: #ddd;
	  line-height: 54px;
	  border-radius: 2px;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  text-align: center;
	  min-width: 150px;
	  height: 54px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  cursor: pointer;
	  color: #999;
	  font-size: 24px;
	  border-color: #ddd;
	  line-height: 54px;
	  border-radius: 2px;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  text-align: center;
	  min-width: 150px;
	  height: 54px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #ddd;
	  border-radius: 0px;
	  padding: 12px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  color: #666;
	  background: none;
	  width: 96%;
	  font-size: 14px;
	  height: 120px;
	}
</style>
