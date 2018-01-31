import React from 'react';
import Search from './Search';
import Artists from './Artists';

const Home = ({ artists, onInputChange, onSearch, onSelectArtist }) => (
  <div>
    <Search onInputChange={onInputChange} onSearch={onSearch}/> {artists.length > 0 && <Artists artists={artists} onSelectArtist={onSelectArtist}/>
}
  </div>
);

export default Home;
