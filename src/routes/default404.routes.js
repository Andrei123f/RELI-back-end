function default404(router){
router.post('*', function(req, res){
    res.status(404).json
    (
      {
        result: "ERROR",
        message: "Resource could not be found in the server 😔."
      }
    );
  });

router.get('*', function(req, res){
    res.status(404).json
    (
      {
        result: "ERROR",
        message: "Resource could not be found in the server 😔."
      }
    );
  });
}
module.exports = default404;