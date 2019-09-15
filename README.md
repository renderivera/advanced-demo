# Rails API backend, React frontend, Graph Traversal
When you activate the tiles this is processed on Client side in the view. Once you hit the button "find largest cluster" the tiles are sent via POST request to the backend Rails API controller. The backend performs graph traversal to identify all clusters. The largest cluster is then returned to the frontend/client.

## Hosted on Google App Engine
https://draw-something-rails-react.appspot.com/

## Implementation Notes
create project with react and postgresql
```ruby
rails new basic-demo --database=postgresql --webpack=react
```

----

edit credentials with
```ruby
rails credentials:edit
```

access with 
```ruby
Rails.application.credentials.postgres[:username]
```
----

add a new view and controller with
```ruby
rails generate controller start index
```
  
----

set root of webapp by editing config/routes.

```ruby
root Start#index
```
sets the root to the index action of Start controller

----

add typescript to the project with


```ruby
yarn add typescript
```

next add a tsconfig.json file, to configure the TS compiler options

you can manually compile a typescript file with the tsc command

```ruby
tsc filename.ts
```
also works with tsx to create jsx files for react

----

add strict typing / no implicit any declarations edit the tsconfig.json and add 
```ruby
"noImplicitAny",true
```

install the react types to make the Typescript compile
```ruby
npm install --save @types/react
npm install --save @types/react-dom
```

(if there are issues with npm, delete the lockfile && node_modules and reinstall with npm install and yarn install) 

----



to avoid introducing empty container elements with react render() use 
```html
<React.fragment> ... </React.fragment>
```
as wrapper

for rendering arrays/collections, each list item needs a unique key so React knows whicht elements to re-render.
```html
<li key="ID">array element</li>
```

----
create ORM ActiveRecord with

```ruby
rails generate model Message user:text message text
```  

this creates a subclass of ActiveRecord and a migration file


----
building forms with react is amazing, learn more here: https://reactjs.org/docs/forms.html

----
seeding db with sample data, edit db/seeds.rb
and seed with 

```ruby
rake db:seed
```  

----
handle/fix cross-site request forgery vulnerability, rails has a helper for that. add this to the ApplicationController
```ruby
protect_from_forgery with: :null_session
```  

Rails uses cryptographic tokens bound to the user session to fix this vulnerability.

----
Our application is API-based and so controllers folders structure require us following namespace convention with API version specification, like so for instance: 
```ruby
app/controllers/api/v1
```  

Versioning the API means that changes can be made to it in future without damaging the original version.

----
websockets can be implemented with ActionCables
```html
https://guides.rubyonrails.org/action_cable_overview.html
https://nithinbekal.com/posts/rails-action-cable/
https://medium.com/@rossbulat/react-hooks-managing-web-sockets-with-useeffect-and-usestate-2dfc30eeceec
```  

Actioncables are not very stable nor performant.
```html
https://evilmartians.com/chronicles/anycable-actioncable-on-steroids
```  

gRPC would be a solid solution for bi-directional communication, as it is both stable and fast.
However, I used a Poll approach for simplicity sake as this is not the focus of this exercise.
Each React components calls periodically (5s) the REST Api from the Rails Server to get new messages.

---
set up cloudsql with postgres: 
```html
https://cloud.google.com/ruby/rails/using-cloudsql-postgres
```
---
to iterate over a Hash / Map in Typescript you need to activate this flag in the tsconfig
```html
"downlevelIteration": true
```

## Unit Testing
with default test libary that comes with Rails "MiniTest". Minitest tests are written in plain Ruby unlike Rspec which uses a custom DSL. Minitest is recommended by the Rails team as it is lightweight, fast and can cover most usecases.
```ruby
class Api::V1::TilesControllerTest < ActionController::TestCase
    test "should post with no params to largest and fail" do
        post :largest
        assert_response :bad_request
    end

    test "should post with correct params to largest and succeed" do
        post :largest, as: :json, 
            params: { xCount: "2", yCount: "1", tiles: 
            [["0,0", {"x"=>0, "y"=>0, "active"=>true}], 
            ["1,0", {"x"=>1, "y"=>0, "active"=>false}]]}
        assert_response :success
    end
end
```
run tests with
```bash
rails test
```
switch deprecated modules, more info: https://everydayrails.com/2019/04/09/chromedriver-helper-webdrivers.html
