const app = Sammy('#root', function(){
    
    this.use('Handlebars', 'hbs');
    // GET HOME
    this.get('#/home', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/home.hbs');
        });
    });
});
(()=>{
    app.run('#/home');
})();