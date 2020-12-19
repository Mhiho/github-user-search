import React from 'react';


interface IProps {
    result?: any;
    user: any;
    repos?: any;
    loading: boolean;
}


const SearchResult: React.FC<IProps> = (props: IProps) => {
    const { result, user, repos, loading } = props;

    const findBest3Repos = (reps: any) => {
        reps.sort((a: any, b: any) => a.stargazers_count < b.stargazers_count ? 1 : a.stargazers_count > b.stargazers_count ? -1 : 0);
        // Poniżej wystarczy zmienić drugi argument funcji slice, żeby zwiększyć ilość wyświetlanych repozytoriów
        return reps.slice(0, 3);
    }
    const sorted3Repos = findBest3Repos(repos)
    return (
        <React.Fragment>
            {
                !loading ?
                    result ?
                        <div>

                            <h1>
                                {result.login}
                            </h1>
                            {
                                result.avatar_url &&
                                <img alt="userIcon" style={{ width: '200px' }} src={result.avatar_url} />
                            }
                            {user && user.bio ?
                                <p>{user.bio}</p>
                                : <p>Użytkownik nie posiada wsłasnego opisu.</p>
                            }


                            <ul>
                                {sorted3Repos ? sorted3Repos.map((repo: any, index: number): any => (
                            <li key={`repos-index-${index}`}><a href={repo.html_url}>{repo.name}</a></li>
                        )
                        ) : 'Użytkownik nie ma żadnych repozytoriów'}
                            </ul>
                        </div> : 'Nie ma takiego użytkownika' : null
            }

        </React.Fragment>
    )
}

export default SearchResult;