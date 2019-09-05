Rails.application.routes.draw do
  root 'start#index'

  namespace :api do
    namespace :v1 do
      get 'tiles/(:id)', to: 'tiles#index'
      post '/largest', to: 'tiles#largest'
    end
  end 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end