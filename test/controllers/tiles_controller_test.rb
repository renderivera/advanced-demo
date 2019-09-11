require 'test_helper'

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
    
    test "should post with faulty params to largest and fail" do
        post :largest, as: :json, 
            params: { xCount: "5", yCount: "5", tiles: 
            [["0,0", {"x"=>0, "y"=>0, "active"=>true}], 
            ["1,0", {"x"=>1, "y"=>0, "active"=>false}]]}
        assert_response :bad_request
    end

end