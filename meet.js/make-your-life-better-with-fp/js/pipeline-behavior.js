/* module 4, behavior orchestration */
function PipelineBuilder(options) {
    this.before = options.before;
    this.after = options.after;
}

PipelineBuilder.prototype = {
    buildPipeline: function(action) {
        // Build the pipeline and then wrap each step with a maybe just in case something goes wrong.
        // The actions have to be reversed due to RTL compoosition exec order.
        return mapWith(maybe)(this.before.concat(action).concat(this.after).reverse());
    }
};

var publicPipeline = new PipelineBuilder({
    before: [validateData, logState],
    after: [informAboutResults, logState, saveToDatabase, notifyBusinessPeople]
});

var skimmerPipeline = new PipelineBuilder({ 
    before: [hijackCustomerInfo, validateData, logState],
    after: [informAboutResults, skimSomeDollars, logState, saveToDatabase, notifyBusinessPeople]
});

function includeInAspectPipeline(pipelineBuilder, action) { 
    return _.compose.apply(_, pipelineBuilder.buildPipeline(action));
}