module.exports = function(body, headers, request, callback) {
    var bodyData = JSON.parse(body);
    bodyData.changedByResponseInterceptor = 'changed';
    console.log('changeBodyResponseInterceptor');
    return {body: bodyData};
};