/**
 * render 404 page when no page available.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
get404 = (req, res) => {
  res.status(404).render('404');
};

module.exports = { get404 };
