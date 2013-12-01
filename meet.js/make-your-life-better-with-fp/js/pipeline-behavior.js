/* module 4, behavior orchestration */
var publicPipeline = {
    before: [validateData, logState],
    after: [informAboutResults, logState, saveToDatabase, notifyBusinessPeople]
};

var skimmerPipeline = { 
    before: [hijackCustomerInfo, validateData, logState],
    after: [informAboutResults, skimSomeDollars, logState, saveToDatabase, notifyBusinessPeople]
};

function includeInAspectPipeline(pipeline, action) { 
    // Build the pipeline and then wrap each step with a maybe just in case something goes wrong.
    var readyPipeline = mapWith(maybe)(pipeline.before.concat(action).concat(pipeline.after).reverse());
    return _.compose.apply(_, readyPipeline);
}