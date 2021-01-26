import router from './router'

router.beforeEach((to, from, next)=>{
    if(to.matched.some(record=>record.meta.requireAuth)){
        const toen = localStorage.getItem("token");
        if(token){
            if(to.path === '/user/loginIn'){}
            else next();
        }
        else{
            next({path: '/user/loginIn'});
        }
    }
    else{
        next();
    }
})