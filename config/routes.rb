Rails.application.routes.draw do
  root 'root#index'
  resources :greetings, only: [:index] do
  end
end
