class Api::V1::TilesController < ApplicationController
  wrap_parameters false
  logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
  logger.debug "NEW REQUEST"

  def largest

    
    render json: profile_params
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
    params.require(:_json).require([])
  end
end