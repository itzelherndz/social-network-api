const dateFormat = require('date-format');
const { masks } = require('date-format');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat(createdAt, "shortDate")
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat(createdAt, "shortDate")
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        }, 
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get (function () {
        return this.reactions.length;
    });

const Thought = model ('thought', thoughtSchema);

module.exports = Thought;