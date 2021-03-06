import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../app-status-filter/post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';

export default class App extends Component {
   constructor(props){
      super(props);
      this.state = {
         data: [
            { label: "Some text", important: false, like: false, id: 1 },
            { label: "Going to learn JSX", important: false, like: false, id: 2 }, 
            { label: "That is so good", important: false, like: false, id: 3 }
         ],
         term: '',
         filter: 'all'
      }
      this.deleteItem = this.deleteItem.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onToggleImportant = this.onToggleImportant.bind(this);
      this.onToggleLiked = this.onToggleLiked.bind(this);
      this.onUpdateSearch = this.onUpdateSearch.bind(this);
      this.onFilterSelect = this.onFilterSelect.bind(this); 

      this.MaxId = 4;
   }


   deleteItem(id){
      this.setState(({data}) => {
         const index = data.findIndex( item => item.id === id);
         console.log(data);

         const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
         return{
            data: newArr
         }
      });
   }

   onAdd(body){
      const newItem = {
         label: body,
         important: false,
         id: this.MaxId++
      }
      this.setState(({data}) => {
         const newArr = [...data, newItem];
         return{
            data: newArr
         }
      })
   }

   

   onToggleImportant(id){
      this.setState(({data}) => {
         const index = data.findIndex(elem => elem.id === id);

         const old = data[index];
         const newItem = {...old, important: !old.important};

         const newArr = [...data.slice(0, index), newItem , ...data.slice(index + 1)];

         return{ 
            data: newArr
         }
      })
   }

   onToggleLiked(id){
      this.setState(({data}) => {
         const index = data.findIndex(elem => elem.id === id);

         const old = data[index];
         const newItem = {...old, like: !old.like};

         const newArr = [...data.slice(0, index), newItem , ...data.slice(index + 1)];

         return{ 
            data: newArr
         }
      })
   }

   searchPost(items, term){
      if(term.length === 0){
         return items
      }
      
      return items.filter((item) => {
         return item.label.indexOf(term) > -1
      })
   }

   filterPost(items, filter){
      switch(filter){
         case 'like':
            return items.filter(item => item.like);
            break;
         case 'important':
            return items.filter(item => item.important);
            break;
         case 'all':
            return items;
            break;
      }
   }

   onUpdateSearch(term){
      this.setState({term})
   }

   onFilterSelect(filter){
      this.setState({filter})
   }

   render(){
      const {data, term, filter} = this.state;

      const liked = data.filter(item => item.like).length;
      const importanted = data.filter(item => item.important).length;
      const allPosts = data.length;

      const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

      return (
         <div className="app">
            <AppHeader 
               liked={liked}
               allPosts={allPosts}
               importanted={importanted}/>
            <div className="search-panel d-flex">
               <SearchPanel 
                  onUpdateSearch={this.onUpdateSearch}/>
               <PostStatusFilter 
                  filter={filter}
                  onFilterSelect={this.onFilterSelect}/>
            </div>
            <PostList 
               posts={visiblePosts}
               onDelete={ this.deleteItem }
               onToggleImportant={this.onToggleImportant}
               onToggleLiked={this.onToggleLiked}/>
            <PostAddForm 
               onAdd={ this.onAdd }/>
         </div>
      )
   }
}