import { useState } from 'react';
import gitLogo from '../assets/logo-github-removebg-preview.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);
  

  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`);

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório não encontrado')

  };

  const handleRemoveRepo = (id) => {
    console.log('Removendo registro', id);

    const updateRepos = repos.filter(repo => repo.id !== id);
    setRepos(updateRepos);
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => ( <ItemRepo key={repo.id} repo={repo} onRemove={handleRemoveRepo}/> ))}
      
    </Container>
  );
}

export default App;
