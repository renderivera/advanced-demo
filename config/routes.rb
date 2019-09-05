Rails.application.routes.draw do
  root 'start#index'

  namespace :api do
    namespace :v1 do
      post 'get_largest_tile_cluster/:tiles[]', to: 'tiles#get_largest_tile_cluster'
    end
  end 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end