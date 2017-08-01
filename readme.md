# Machine Learning for Processing Audio (Mastering?)

It's just an idea, some abstract data structures and a lot of thinking about
feasibility, but it's worth doing. Check the design-docs folder.

[Here's a quick dirty javascript object prototype that represents an audio file.](https://github.com/dabbamont/brainy-mastering/blob/master/design-docs/object-prototypes.js)

## The Early Introduction and Statement of Purpose

Brainy Mastering is a proposed open source software project started by
a professional software engineer/amateur audio engineer, mainly in response
to the success of LANDR. The idea of an algorithm successfully mastering
a song is a sickening, but inspiring prospect. Looking at LANDR after the fact,
it does make a lot of sense that machine learning can be used to create smart
audio processing software. While LANDR does a great job of creating an audio
file as the end product, most audio engineers would love to maintain some
control of what they will ultimately give to the world.

The immediate goal of this project is for producers and engineers to have
an application that can take in their final mix as an audio file, let the AI do
its work to make the audio sound great, but then **provide the user with an
interface to tweak the parameters to their liking**. Think of it as having
someone else do all the heavy lifting, then present you with your favorite
mastering rack so you can add that human touch.

So far, I've only come up with a rough prototype of what a track object would
look like. To create an intelligent mastering process, we essentially need to
feed our software tons and tons of various professionally mastered tracks.
This will allow us to input our own mix on the other end, and in turn have
our software use this huge set of great examples to figure out what a mix
matching our specific signature looks like when it sounds great, then process
audio accordingly.

## Semi-Technical Concepts

### Breaking Apart The Mix

The initial data structure is based upon common studio mastering work flow,
but goes beyond the capabilities of a DAW to offer help and simplicity.

A track is broken down into bars, bars are broken up into useful frequency
bands. The band of the bar is the basic building block of your finished product.

Each of these blocks is evaluated to establish a few key metrics, being
loudness, the first being loudness and stereo width. Conceptually, these are
two of the things you're really going for when you use mastering tools, and
they are conveniently also quite useful.

#### Loudness and Power

Everyone is familiar with the task of trying to adjust the amount of loudness
and power on a frequency range of their master channel. Since we're working
with a dataset rather than an audio signal, we can rely on advanced
normalization algorithms to do what engineers try to do with compressors,
limiters and all that. This is what streaming platforms use to get
"loud". We simply harness this at a much more nuanced level.

#### Stereo Width

I've always liked applying stereo width on different frequency bands on the
master channel. No matter how much attention I pay to my mix, it always feels
good to tighten up the bass, or to give the hihats a bit more width for a more
immersive sound. Luckily, this is also something AI can help us along with.

### Teaching a Computer How To Master

#### Learning From The Best

I'm admittedly not a machine learning expert, though I've done enough to know
what's feasible. Since we've established that we can take an audio file and
break it down into a useful data structure, we can take mountains of great
mastered music files, break them down the same way and store the metadata
in a database. The magic of machine learning allows us to (hopefully) let our
software analyze this data to establish patterns of what makes a mastered
song sound great.

As an example, say you're happy with your final mix of your folk bands
new single. When broken down, our software *should* be able to use this
data as a signature to match it closely enough to thousands of professional
folk releases. These are used to generate an "ideal" set of target values
for each bar of our track. We should be presented with something that sounds
great, but in an interface that will allow us to tweak everything before
rendering a final copy.
