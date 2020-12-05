const app = Sammy('#root', function(){
    
    this.use('Handlebars', 'hbs');
    // GET HOME
    this.get('#/home', function(context){
    
        if(Boolean(getUser())){
            db.collection('posts')
            .get()
            .then(posts => {
            context.articles = [];
            posts.forEach(post => {
                const isAuthor = post.data().author === getUser().email;
                context.articles.push({id:post.id, ...post.data(), isAuthor });
            });
            
            loadPartials(context).then(function(){
                this.partial('../views/home.hbs');
            });
        }).catch(errorHandler);
        }else {
            loadPartials(context).then(function(){
                this.partial('../views/home.hbs');
            });
        }
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
                context.redirect('#/login');
            })
            .catch(errorHandler);
    });

    // POST create-post
    this.post('/create-post', function(context){
        const { title, category, content } = context.params;
        db.collection('posts').add({
            title,
            category,
            content,
            author: getUser().email
        }).then(res => {
            context.redirect('#/home');
        }).catch(errorHandler);
    });

    // GET details/:id
    this.get('#/details/:id', function(context){
        const { id } = context.params;
        db.collection('posts')
            .doc(id)
            .get()
            .then(res => {
                context.post = { ...res.data() };
                loadPartials(context).then(function(context){
                    this.partial('../views/details.hbs');
                });

            })
            .catch(errorHandler);
    });

    // EDIT article/:id
    this.get('#/edit/:id', function(context){
        const { id } = context.params;
         db.collection('posts')
            .doc(id)
            .get()
            .then(res => {
                context.post = {id, ...res.data() };
                loadPartials(context).then(function(context){
                    this.partial('../views/edit.hbs');
                });
             })
            .catch(errorHandler);
    });

    // POST EDIT article/:id
    this.post('/edit/:id', function(context){
        const { title, category, content, id } = context.params;
        db.collection('posts')
            .doc(id)
            .set({
                title,
                category,
                content,
                author: getUser().email
            })
            .then(res => {
                this.redirect('#/home')
            })
            .catch(errorHandler);

    });
    // DELETE article/:id
    this.get('#/delete/:id', function(context){
        const { id } = context.params;
        db.collection('posts')
            .doc(id)
            .delete()
            .then(function(){
                context.redirect('#/home');
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