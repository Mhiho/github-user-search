import React from 'react';


interface IProps {
    result?: any;
    user : any;
    repos?: any;
    loading : boolean;
}


const SearchResult: React.FC<IProps> = (props: IProps) => {
    const { result, user, repos, loading } = props;
    
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
                    { user && user.bio ?
                        <p>{user.bio}</p>
                        : <p>Użytkownik nie posiada wsłasnego opisu.</p>
                    }


                    <ul>
                        {repos ? repos.map((repo: any, index: number): any => (
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