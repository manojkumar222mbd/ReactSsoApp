exports.success = (res, result) => {
	res.status(200).send({
		error: null,
		status: 1,
		response: result
	});
}

exports.error = (res, err, errCode) => {
	rescode = errCode || err.code || 400;
	res.status(rescode).send({
		error: err && err.message ? err.message : err,
		status: 0,
		response: null
	});
}