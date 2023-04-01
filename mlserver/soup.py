import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
# from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
import json


# credits_df = pd.read_csv("./tmdb_credits_exp.csv")
# movies_df = pd.read_csv("./tmdb_movies_exp.csv")

credits_df = pd.read_csv("./tmdb_credits.csv")
movies_df = pd.read_csv("./tmdb_movies.csv")

credits_df.columns = ['id', 'tittle', 'cast', 'crew']
movies_df = movies_df.merge(credits_df, on="id")

features = ["cast", "crew", "keywords", "genres"]


for feature in features:
    movies_df[feature] = movies_df[feature].apply(json.loads)
#    movies_df[feature] = movies_df[feature].apply(literal_eval)


def get_director(x):
    for i in x:
        if i["job"] == "Director":
            return i["name"]
    return np.nan


#
#
def get_list(x):
    if isinstance(x, list):
        names = [i["name"] for i in x]

        if len(names) > 5:
            names = names[:5]

        return names

    return []


movies_df["director"] = movies_df["crew"].apply(get_director)

features = ["cast", "keywords", "genres"]
for feature in features:
    movies_df[feature] = movies_df[feature].apply(get_list)

movies_df[['title', 'cast', 'director', 'keywords', 'genres']].head()


def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ""


features = ['cast', 'keywords', 'director', 'genres']
for feature in features:
    movies_df[feature] = movies_df[feature].apply(clean_data)


def create_soup(x):
    return ' '.join(x['keywords']) + ' ' + ' '.join(x['cast']) + ' ' + x['director'] + ' ' + ' '.join(x['genres'])


movies_df["soup"] = movies_df.apply(create_soup, axis=1)

count_vectorizer = CountVectorizer(stop_words="english")
count_matrix = count_vectorizer.fit_transform(movies_df["soup"])

#cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
cosine_sim2 = linear_kernel(count_matrix, count_matrix)

movies_df = movies_df.reset_index()
indices = pd.Series(movies_df.index, index=movies_df['title'])


def get_recommendations2(title, cosine_sim=cosine_sim2):
    """
    in this function,
        we take the cosine score of given movie
        sort them based on cosine score (movie_id, cosine_score)
        take the next 10 values because the first entry is itself
        get those movie indices
        map those indices to titles
        return title list
    """
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:30]
    # (a, b) where a is id of movie, b is sim_score

    movies_indices = [ind[0] for ind in sim_scores]
    movies = movies_df["title"].iloc[movies_indices]
    return movies


def get_itemspredicted2(prediction):
    recommendations = get_recommendations2(prediction)
    movies = []
    for movie in recommendations:
        movies.append(movie)
    return movies


#print(get_itemspredicted2("No Exit"))