---
slug: "/posts/addabert"
title: "AddaBert"
date: 2020-07-29
categories: transformers, bert
---

*This example is runnable as a Google Colab notebook [here](https://colab.research.google.com/drive/14iAiYAp864c0nETje7Rt10UQwfxicqNC?usp=sharing)

### Introduction

In my earlier post about [Addagrams](/posts/generating-addagrams), I tackled the problem of generating a sequence of valid English words such that successively larger words contain all the letters of the smaller words. At that time, I was asked by multiple people if there would be a blog post on solving addagram puzzles, which is a more interesting and general problem. 

To solve an addagram puzzle, a program had to build a set of English words that fit a given blank, identify the most probable words that fit the context of the sentence and be able to do it *while* satisfying the constraint that the words must be addagrams of each other. This problem of picking the right words involve studying how the words of the English language relate to each other and form written text or spoken language. This is what's referred to in NLP parlance as a **language modelling** task. There are several algorithms to build such models of English which range from simple **n-gram Language Models** (a Markov Model of English Words), **Maximum Entropy Models**, and the more fashionable Deep Neural Network approaches using **Recurrent Neural Network** models and **Transformers**.

In order to be able to apply these approaches, it would be quite helpful to sort of run through the process of how we'd solve the puzzle. If we didn't have the restrictions imposed by the puzzle, we would be more inclined to fill in the blanks with more common words that we know would make sense in context. However, when we try to fill in the blanks *with* the addagram constaints, a lot of the more obvious words would begin to be ruled out and we then start to agonize over what words fit, which leads to it becoming a serious test of how rich your vocabulary is.

One key skill needed for addagram solving is to figure out one obvious word in the paragraph and use that to guide your efforts to solving the rest of the puzzle. Once you happen to pick one correct word, you start using that as a basis for narrowing down the list of possible words for the remaining blank. Once you start filling in more words that fit the pattern, the confidence in your earlier guesses will start rising and you're likely to pick words that only contain the letters you've seen already. It would be worthwhile to see how well this strategy works in practice.

## Controlling Language Generation

An interesting problem in language modeling is that of controllability of language generation, with approaches to bias the model to produce outputs of a desired kind. There are several ways to control how these models behave. An interesting approach that pioneered made use of RNN models is that of the system Hafez (Ghazvininejad et al. 2017) which generated poetry controlled by various rules. See et al. 2019 provides a good summary of how some very simple tricks can be used to make language generation models produce human-like conversation.

## Bayes is Bae



## Guiding BERT