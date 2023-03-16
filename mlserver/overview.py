import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

credits_df = pd.read_csv("./tmdb_credits.csv")
movies_df = pd.read_csv("./tmdb_movies.csv")

# credits_df = pd.read_csv("https://drive.google.com/uc?export=download&id=1L6posz44Zp0noUKoI5himdR-sh45masE")
# movies_df = pd.read_csv("https://drive.google.com/uc?export=download&id=1QBQf3JuLhj9PUDyhwQlT2QDnP-F-7m16")

credits_df.columns = ['id', 'tittle', 'cast', 'crew']
movies_df = movies_df.merge(credits_df, on="id")


tfidf = TfidfVectorizer(stop_words="english")
movies_df["overview"] = movies_df["overview"].fillna("")
tfidf_matrix = tfidf.fit_transform(movies_df["overview"])


# Compute similarity
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(movies_df.index, index=movies_df["title"]).drop_duplicates()


def get_recommendations(title, cos_sim=cosine_sim):

    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:30]
    movies_indices = [ind[0] for ind in sim_scores]
    movies = movies_df["title"].iloc[movies_indices]
    return movies


def get_itemspredicted(prediction):
    recommendations = get_recommendations(prediction)
    movies = []
    for movie in recommendations:
        movies.append(movie)
    return movies

#print(get_itemspredicted("No Exit"))