# Rails API backend, React frontend, Graph Traversal
When you activate the tiles this is processed on Client side in the view. Once you hit the button "find largest cluster" the tiles are sent via POST request to the backend Rails API controller. The backend performs graph traversal to identify all clusters. The largest cluster is then returned to the frontend/client.

## Hosted on Google App Engine
https://draw-something-rails-react.appspot.com/

## Implementation Notes
see "basic app" notes for basics. 
```html
https://github.com/Raunchard/rails-react-typescript-postgres-portfolio/blob/master/basic-demo/README.md
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
