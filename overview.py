import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity


credits_df = pd.read_csv("./tmdb_credits.csv")
movies_df = pd.read_csv("./tmdb_movies.csv")

credits_df.columns = ['id', 'tittle', 'cast', 'crew']
movies_df = movies_df.merge(credits_df, on="id")

tfidf = TfidfVectorizer(stop_words="english")
movies_df["overview"] = movies_df["overview"].fillna("")

tfidf_matrix = tfidf.fit_transform(movies_df["overview"])

# Compute similarity
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(movies_df.index, index=movies_df["title"]).drop_duplicates()


def get_recommendations(title, cosine_sim=cosine_sim):
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


def get_itemspredicted(prediction):
    recommendations = get_recommendations(prediction)
    movies = []
    for movie in recommendations:
        movies.append(movie)
    return movies

# print("################ Content Based Filtering - plot#############")
# print()
# print("Recommendations for The Dark Knight Rises"#)
# print(get_recommendations("The Dark Knight Rises"))
# print()
# print("Recommendations for Avengers")
# print(get_recommendations("The Avengers"))
