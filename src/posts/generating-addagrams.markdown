---
slug: "/posts/generating-addagrams"
title: "Generating Addagrams"
date: 2017-06-05
categories: algorithms python
---
*The code for this post is shared in [this gist](https://gist.github.com/rrajasek95/cf3a8aabf17057d278bf0e6a5bbe91c0). The code requires Python 3 to run, so modify it appropriately to work with Python 2.*

## Introduction
When I was in college, I was part of a club called Balls by Picasso, which is the Literary and Debating Society of NIT Trichy. The club's work involves setting various literary events for the different fests which are held in NIT Trichy and elsewhere. My primary interest is quizzing, for which I am quite fond of setting questions. That involves a lot of research of content, clever round design and very well framed questions. I'm also into Word Games, which include events like Cryptic Crosswords, What's The Good Word (WTGW) and Potpourri. On the flip side, setting questions for these are harder and tedious (at least for me).

What's The Good Word is an especially tedious event, from a setter's perspective. The event comprises of multiple word puzzles which the participant must solve. A good paper will have a mix of easy and hard puzzles which both beginners and experts alike enjoy solving. A beginner should be able to understand how to solve the puzzles without any difficulty. At the same time, experts shouldn't find the puzzles too easy or too monotonous or be puzzles which they've seen before (which is termed quite quite crudely in English Lits circles as *repeats*). Thus the onus is on the setter to create puzzles which are both versatile and approachable.

A very good example of such a puzzle is the Addagram. The word is a portmanteau of the words "Add" and "Anagram", which gives a rough idea of what it involves. In this puzzle, a paragraph is given with a certain set of words blanked out. For each blank, the number of letters of that word are given. The basic idea is that the blanked out words form a sequence. 

It has the property that for a given word in the sequence:
- The next word contains an extra letter
- The next word is an anagram of the previous word


Here's an example question from our club archives which illustrates what it is:
```
As a ___(3), Harry had no idea who he was.

He had never ____ (4) eyes on anything that 

was _____(5) for him. When Hogwarts ______(6) 

him, people tried to _______(7) him into believing 

it was a school meant for people with ________(8).
```

The words which solve the puzzle are:
- LAD
- LAID
- IDEAL
- MAILED
- MISLEAD
- MALADIES

The pattern makes it quite clear about what letter is added to each word and how the anagramming works. With these basic rules, we can see that word sequences are something that can be computed. So, the goal of this post is to create a utility which can be used for generating valid addagram sequences for setting questions.

## The Approaches
### Brute Force
We can come up with a brute force approach quite simply as follows:
1. Start with a single letter
2. Add letters at various positions of the word to produce new candidate words
3. Check if the candidate words are present in the dictionary
4. If the candidate word is valid, go to step 2 and repeat the process until you get a long enough sequence

If we look carefully at what's happenening, letters must be added at various positions along the word. When we're building a 7 word sequence, we need to:
- Single Letter: Add letters at 2 positions (before and after the letter) and then check the dictionary = $26 \times 2 \times cost_{lookup}$
- Two Letter: Add letters at 3 positions and then check the dictionary = $$ 26 \times3 \times cost_{lookup} $$
- Three Letter: Add letters at 4 positions and then check the dictionary = $$ 26 \times 4 \times cost_{lookup} $$
- ...
- Six Letters: Add letters at 7 positions and then check the dictionary = $$ 26 \times 7 \times cost_{lookup} $$

Since we're doing this in sequence, the cost of these operations are multiplied. This yields something like $$ 26^7 \times 7! = 4.048032329 \times 10^{13} $$. Furthermore this is excluding the cost of looking up and the cost of inserting letters between words. This approach is computationally inefficient since the number of operations is in the order of trillions. 

### Analysis
As we saw, the brute force approach is stupidly inefficient, so we need to come up with something better. We need to break the problem into various steps and see what we can do better at each stage.

Let's make a list of things we're doing:
- Adding letters to a word
- Anagramming the word
- Making a sequence out of these anagrammed words

We tackle the concept of anagrams first in solving the problem.

#### Anagrams
Most of us know what anagram is already, but let's look at the basic definition to see if that can help us come up with an efficient solution.

*Anagram: (n) a word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.*

The above definition tells us that an anagram is a rearrangement of the letters of a word. That means that the anagram has the same number of letters as the given word. This gives us the first piece of the puzzle -- how to check if a word is an anagram of another.

The algorithm for this is as follows:
- Count the number of occurences of each letter in word 1 and word 2
- Check if the count of occurences of each letter is the same for both words

This now introduces the need for a structure which counts the number of times a letter occurs in a given word, which we'll call a counter. A very simple counter would be an array of 26 ints which hold the count for each letter. We can represent the counts for the word as {no. of as, no. of bs, ..., no. of zs}. So, a word like *hello* would be represented as {0,0,0,0,1,0,0,1,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0}.

We can write our empty counter in Python as:

```python
counter = [0 for _ in range(26)]
```

We can write a method to add a letter to the counter as:

```python
def add_letter(counter, letter):
    new_counter=counter[:]
    new_counter[ord(letter) - 97] += 1
    return new_counter
```

What this does is takes an existing counter, creates a copy of it, adds one to the corresponding index and returns the new counter with the letter added to it. This is useful in stages where we're adding only a single letter and don't want to lose the original counter.

We'll create another function to create a counter for a word as follows

```python
def w2c(word):
    counter = [0 for _ in range(26)]
    for letter in word:
        counter[ord(letter) - 97] += 1
    return counter
```

Now that we've done this, we can implement an anagram check function as:

```python
def are_counts_equal(counter1, counter2):
    for i in range(26):
        if counter1[i] != counter2[i]:
            return False
    return True

def are_anagrams(word1, word2):
    return are_counts_equal(w2c(word1), w2c(word2))
```

Now, this is very useful if we want to get the list of anagrams for a given word. Let's assume that we have a list of 4 letter english words. We can easily get all anagrams of a word such as *wolf* like:

```python
anagrams_of_wolf = [word for word in dictionary if are_anagrams(word, 'wolf')]
```

With this, we've implemented an easy way to find anagrams of a given word. Now that we've dealt the "Anagram" portion of the problem, we can work on the "Add" part of it.

#### Anagrams and Counters
So far, we've seen how to check if words are anagrams of each other by checking if their counter values are the same. Let's describe the counters more concisely as $$ \{a: count_a, b:count_b, \ldots, z:count_z \} $$ except we show only the counts which are non-zero. The words *wolf* and *flow* are anagrams of each other and hence both have a counter $$ \text{\{f:1, l:1, o:1, w:1\}} $$. Now let's look at this in the reverse perspective. We can say that $$ \text{\{f:1, l:1, o:1, w:1\}} $$ acts as a common identity for the anagrams *wolf* and *flow*. So we can store all the anagrams of for a given counter in a dictionary as a form of preprocessing. This would make it easy when we need to go through all the possible anagrams for a given counter. 

Unfortunately, it introduces a new problem, namely the fact that lists cannot be used as the key to a dictionary. We need to come up with a representation that can be used as a key in a dictionary. Thankfully, in our problem we do not need to look for words longer than 10 to 12 letters. Furthermore, an actual word of that length cannot have more than 10 of the same letter. Even the ridiculously long [Pneumonoultramicroscopicsilicovolcanoconiosis](https://en.wikipedia.org/wiki/Pneumonoultramicroscopicsilicovolcanoconiosis) has 9 *o*s. So we can quite simply represent our counter as a 26 digit number, with each digit corresponding to the count of the letter. While this may not work/be easy in other languages, it's quite straightforward in Python. We can implement our new counter as follows:

```python
def w2c(word):
    counter = 0
    for letter in word:
        counter += 10**(ord(letter) - 97)
    return counter


def add_letter(counter, letter):
    counter += 10**(ord(letter) - 97)
    return counter
```

In this representation, the count positions are reversed. The rightmost digit corresponds to *a* and the leftmost corresponds to *z*. Another huge plus is that we can check if two words are anagrams by just doing `counter1 == counter2`, which simplifies things by a great deal.

We now need to build a mapping between the counter and an anagram. We can build this by iterating through the list of words, generate the corresponding counter values and adding them to the list. We can represent this as

```python
def get_counter_anagram_map(word_list):
    counter_anagram_map = dict()
    for word in word_list:
        counter = w2c(word)
        if counter in counter_anagram_map:
            counter_anagram_map[counter].append(word)
        else:
            counter_anagram_map[counter] = [word]
    return counter_anagram_map
```

I used the word list from the Official Scrabble Player's Dictionary or OSPD for short. This ensures that no proper nouns are included, which makes sense, since our addagram puzzle requires normal English words. 

At this point, I'd like to discuss a few potential extensions for this problem. This problem can be extended to other languages too, however you will need to come up with your own mapping scheme since the technique I used above makes use of ASCII codes for English. Furthermore, I'll be using `alphabet` to represent the string `'abcdefghijklmnopqrstuvwxyz'` to iterate over, but you can replace it with your own alphabet as required, provided you create the appropriate counter. Therefore `w2c`, `add_letter` and `alphabet` are language dependent and should be implemented accordingly. The techniques used beyond this point are quite general and do not depend on a particular language.

#### Adding letters
The next thing that we're going to do is to generate anagrams after adding a letter. For example, take the counter $$ \text{\{l:1, o:1, w:1 \}} $$. We can add the letter *f* to the counter and check if the new counter produced has valid english words. If it does, we can then try to add letters to the counter $$ \text{\{f:1, l:1, o:1, w:1 \}} $$. However, adding a letter like *v* or *w* to our older wouldn't yield any anagram words, so we don't need to try to add letters to the counters produced in this case since it's obviously not going to form an addagram sequence. In short, for a given word, we try out all the letters in the alphabet and find the letters, which added, yield anagrammed words. We then take one of those generated words, add a letter and anagram them and so on to get an addagram sequence. We can represent the logic as:

```python
def letter_count(counter):
    letter_count = 0
    while counter > 0:
        letter_count += (counter%10)
        counter //= 10
    return letter_count


def find_addagrams_util(counter, addagram_list, max_length, counter_anagram_map):
    if letter_count(counter + 1) > max_length:
        print(addagram_list)
        return

    for letter in alphabet:
        candidate_counter = add_letter(counter, letter)
        if candidate_counter in counter_anagram_map:
            addagram_list.append(counter_anagram_map[candidate_counter])
            find_addagrams_util(candidate_counter, addagram_list, max_length, counter_anagram_map)
            addagram_list.pop()


def find_addagrams(word, max_length, counter_anagram_map):
    find_addagrams_util(w2c(word), [[word]], max_length, counter_anagram_map)
```


We should now be able to get a list of addagrams by supplying the starting word (such as 'as') to the `find_addagrams` function along with the other parameters -- `max_length` indicating the number of letterns in the longest word and `counter_anagram_map` which allows us to look up the anagrams for a given counter. 

The block below shows portion of the output for addagram sequences for *as* with at most 9 letters: 
```python
[['as'], ['saw', 'was'], ['saws'], ['swats'], ['straws'], ['wasters'], ['stewards'], ['eastwards']]
[['as'], ['saw', 'was'], ['saws'], ['swats'], ['straws'], ['wasters'], ['stewards'], ['westwards']]
[['as'], ['saw', 'was'], ['saws'], ['swats'], ['straws'], ['wasters'], ['waitress'], ['wisterias']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['wasted'], ['steward', 'strawed'], ['eastward'], ['eastwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['wasted'], ['steward', 'strawed'], ['stewards'], ['eastwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['wasted'], ['steward', 'strawed'], ['stewards'], ['westwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['wasted'], ['steward', 'strawed'], ['westward'], ['westwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['swathe'], ['wreaths'], ['weathers', 'wreathes'], ['watershed']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['steward', 'strawed'], ['eastward'], ['eastwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['steward', 'strawed'], ['stewards'], ['eastwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['steward', 'strawed'], ['stewards'], ['westwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['steward', 'strawed'], ['westward'], ['westwards']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['sweater'], ['weathers', 'wreathes'], ['watershed']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['sweater'], ['sweatier', 'weariest'], ['waterside']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['sweater'], ['sweatier', 'weariest'], ['wateriest']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['wreaths'], ['weathers', 'wreathes'], ['watershed']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['waiters', 'wariest'], ['sweatier', 'weariest'], ['waterside']]
[['as'], ['saw', 'was'], ['swat'], ['sweat', 'waste'], ['rawest', 'waster', 'waters'], ['waiters', 'wariest'], ['sweatier', 'weariest'], ['wateriest']]
```

## Conclusion(?)
On an i7 6700HQ Skylake Laptop, it computes all the possible addagram sequences for *as* up to 9 letters in around 4 seconds. With this, I thought maybe I could call it a day. The program runs fast enough for practical purposes, so it may be good for most people. However, let's think about whether we can improve the performance in any way. In the above program, we do a lot of trial and error to check if a generated counter forms an addagram sequence. We try out every possible letter at each and every stage. What if, instead of finding addagrams by trial and error each time, we do the trial-and-error process exactly once and figure out what possible letters can be added to a given counter?

We can do this optimization by building a *Trie* where each node corresponds to a counter and the child nodes correspond to counters which form an addagram sequence with the given counter. Interestingly, our design for the trie also implicity leads to a *[Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)* representation. We can notice this in the following case of the counter $\text{\{l:1, o:1, w:1 \}}$:
1. Adding an f produces $$ \text{\{f:1, l:1, o:1, w:1 \}} $$ 
2. Adding an s produces $$ \text{\{l:1, o:1, s:1, w:1 \}} $$ 
3. Adding an s to the counter in (1) produces $$ \text{\{f:1, l:1, o:1, s:1, w:1 \}} $$
4. Adding an f to the counter (2) produces ... the counter in (3)

We can visualize this in the diagram below

![Diamond Graph](./images/addagram_graph.png)

So, our job then is a matter of constructing a directed acylic graph from the words that we have. To start off, let us define our graph data structure.

```python
class Graph:
    def __init__(self):
        self.adjList = dict()

    def add_vertex(self, v):
        self.adjList[v] = []

    def add_edge(self, v1, v2):
        self.adjList[v1].append(v2)

    def contains_vertex(self, v):
        return v in self.adjList

    def __dfs(self, v, vertex_list, current_length, max_length, counter_anagram_map):
        if current_length > max_length:
            print([counter_anagram_map[vertex] for vertex in vertex_list])
            return

        for vertex in self.adjList[v]:
            vertex_list.append(vertex)
            self.__dfs(vertex, vertex_list, current_length + 1, max_length, counter_anagram_map)
            vertex_list.pop()

    def dfs(self, v, max_length, counter_anagram_map):
        self.__dfs(v, [v], letter_count(v) + 1, max_length, counter_anagram_map)
```

The DFS method is defined in a way similar to the trial-and-error generate addagram function. The only difference is that a specified counter will only visit counters that forms an addagram sequence with it.

The graph construction process can be described as follows:
- Add all valid counters as vertices to the graph
- For each vertex in the graph, add letters of the alphabet to generate new counters
- If the counter produced is not a vertex in the graph, discard it
- Otherwise, add an edge from the counter vertex to the generated counter

We get the generate code as:
```python
def generate_addagram_graph(word_list):
    print("Building addagram graph, this may take a while!")
    g = Graph()
    counter_anagram_map = get_counter_anagram_map(word_list)
    seed_word_counters = counter_anagram_map.keys()
    for counter in seed_word_counters:
        g.add_vertex(counter)
    active_vertices = list(seed_word_counters)
    while active_vertices:
        counter = active_vertices.pop()
        for letter in alphabet:
            candidate_counter = add_letter(counter, letter)
            if g.contains_vertex(candidate_counter):
                g.add_edge(counter, candidate_counter)

    print("Graph built! Writing to disk.")
    with open('addagram_graph.pkl', 'wb') as pkl_file:
        pickle.dump(g, pkl_file)
    with open('counter_anagram_map.pkl', 'wb') as pkl_file:
        pickle.dump(counter_anagram_map, pkl_file)
    print("Saved to disk!")
```

Once the graph is built, we can perform the addagram sequence generation by performing DFS traversals on it using the DFS method with the specified arguments. Ideally, one would want to persist the graph on disk so that it can be reused whenever needed. This is precisely what's done in the gist, which also includes a simple CLI for accepting dictionaries, words, maximum lengths and choosing whether to use the DAG version or the trial-and-error version of the addagram generator.

## Conclusion(!)
The implementation I wrote builds the graph in less than 2 seconds. Furthermore, the DAG version of the generator runs twice as fast as the trial-and-error method in generating the same set of words! This proves that every thoughtful optimization makes a huge difference in performance. This was a very big learning experience in working with Python and problem solving in general. This also happens to be my first blog post as well, so I'll be happy if I can get pointers on improving my writing and presentation. If you want to ask any questions, feel free to send me a mail!