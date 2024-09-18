const base = {
    get() {
        return {
            url : "http://localhost:8080/django1ml1r29h/",
            name: "django1ml1r29h",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于Django的个性化餐饮管理系统"
        } 
    }
}
export default base
