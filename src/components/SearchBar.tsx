import React, { useState } from 'react';
import SearchResult from './SearchResult';

interface IState {
    term?: string;
    userResults?: any;
    user?: {};
    repos?: [];
    loading?: boolean;
}
const SearchBar: React.FC<IState> = () => {

    const [term, setTerm] = useState('');
    const [userResults, setUserResults] = useState({});
    const [repos, setRepos] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        const root_url = 'https://api.github.com';

        const response: any = await fetch(`${root_url}/search/users?q=${term}&per_page=1`);
        const data: any = await response.json();
        setUserResults(data.items[0]);

        const responseBio: any = await fetch(`${root_url}/users/${term}`);
        const dataBio: any = await responseBio.json();
        setUser(dataBio);

        const responseRepos: any = await fetch(`${root_url}/users/${term}/repos`);
        const dataRepos: any = await responseRepos.json();
        setRepos(dataRepos);

        setLoading(false);
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input
                    placeholder="Search for users"
                    type="text"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                />
                <input
                    type="submit"
                />
            </form>
            <SearchResult result={userResults} repos={repos} user={user} loading={loading} />
        </div>
    )
}

export default SearchBar;