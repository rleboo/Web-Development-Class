/* Get home page */ 
module.exports.home = function(req, res) {
    res.render('index', { title: "Ray Leboo's Blog Site"});
  };
  