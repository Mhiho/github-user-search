import React from 'react';
import '../style/main.css';

interface IProps {
    result?: any;
    user: any;
    repos?: any;
    loading: boolean;
}


const SearchResult: React.FC<IProps> = (props: IProps) => {
    const { result, user, repos, loading } = props;

    const findBestRepos = (reps: any) => {
        reps.sort((a: any, b: any) => a.stargazers_count < b.stargazers_count ? 1 : a.stargazers_count > b.stargazers_count ? -1 : 0);
        // Poniżej wystarczy zmienić drugi argument funcji slice, żeby zwiększyć ilość wyświetlanych repozytoriów
        return reps.slice(0, 3);
    }
    const sortedRepos = findBestRepos(repos)
    return (
        <React.Fragment>
            {
                !loading ?
                    result ?
                        <div>
                            {
                                result.avatar_url &&
                                <div className="photo-login">
                                    <img alt="userIcon" src={result.avatar_url} />
                                    <h3>{result.login}</h3>
                                </div>
                            }
                            <div className="bio">

                            {user && user.bio ?
                                <p>{user.bio}</p>
                                : <p>Użytkownik nie posiada wsłasnego opisu.</p>
                            }
                            </div>

                            <div className="bio">
                                <h3>Top repositories:</h3>
                            </div>
                            <div className="repo-buttons">
                                {sortedRepos ? sortedRepos.map((repo: any, index: number): any => (
                                    <button className="repo-button" key={`repos-index-${index}`}><a href={repo.html_url}>{repo.name}</a></button>
                                )
                                ) : 'Użytkownik nie ma żadnych repozytoriów'}
                            </div>
                        </div> : 'Nie ma takiego użytkownika' : null
            }

        </React.Fragment>
    )
}

export default SearchResult;