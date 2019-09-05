class Api::V1::TilesController < ApplicationController
  def index
    render json: {}
  end
  def largest
    render json: resp_body
  end

  private
  def find_cluster
    10
  end
  def resp_body
    {
      cluster: find_cluster
    }
  end

  def profile_params
    params.require(:tiles[])
  end
end