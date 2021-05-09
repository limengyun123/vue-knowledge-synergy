import router from './router'

router.beforeEach((to, from, next)=>{
    if(to.matched.some(record=>record.meta.requireAuth)){
        const token = localStorage.getItem("token");
        if(token){
            if(to.path === '/user/login'){}
            else next();
        }
        else{
            next({path: '/user/login'});
        }
    }
    else{
        next();
    }
})