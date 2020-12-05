const app = Sammy('#root', function(){
    
    this.use('Handlebars', 'hbs');
    // GET HOME
    this.get('#/home', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/home.hbs');
        });
    });

    // GET LOGIN
    this.get('#/login', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/login.hbs');
        });
    });

    // POST LOGIN
    this.post('/login', function(context){
        const { email, password } = context.params;
        auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            createUserData(res);
            this.redirect('#/home');
        })
        .catch(errorHandler);

    });

    // GET REGISTER
    this.get('#/register', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/register.hbs');
        });
    });

    // POST REGISTER
    this.post('/register', function(context){
        const { email, password, repeatPassword } = context.params;
        if(password !== repeatPassword) return;
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                this.redirect('#/login');
            })
            .catch(errorHandler);
    });



    // LOGUT
    this.get('#/logout', function(context){
        auth.signOut().then(function() {
            clearUser();
            context.redirect('#/home');
          }).catch(errorHandler);
    });

});
(()=>{
    app.run('#/home');
})();