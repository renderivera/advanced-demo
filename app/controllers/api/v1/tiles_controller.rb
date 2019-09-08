class Api::V1::TilesController < ApplicationController
  wrap_parameters false
  logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))


  def largest
    logger.debug "NEW REQUEST"
    tile_hash = get_hash_with_all_clusters()

    tile_hash.

    render json: resp_body
  end

  private
  def get_hash_with_all_clusters
    tile_hash = profile_params[2].to_h #converts params to hash 
    x_count = profile_params[0]
    y_count = profile_params[1]
    
    stack = []
    cluster_id = 0;

    tile_hash.each_pair {|key, value|
      stack.push(value)

      #new cluster
      cluster_id += 1

      while !stack.empty?
        val = stack.pop()

        if val[:visited]
          next
        end

        #inject property for graph traversal
        class << val
          attr_accessor :visited
        end
        val[:visited] = true

        if val[:active] #look for neighbors if active
          class << val # add cluster id to "link" the tiles
            attr_accessor :cluster_id
          end
          val[:cluster_id] = cluster_id;
          logger.debug "#{val[:x]},#{val[:y]} - Cluster: #{val[:cluster_id]}"

          if val[:x] > 0
            stack.push(tile_hash.fetch("#{val[:x] - 1},#{val[:y]}")) #left
          end
          if val[:x] < x_count
            stack.push(tile_hash.fetch("#{val[:x] + 1},#{val[:y]}")) #right
          end
          if val[:y] > 0
            stack.push(tile_hash.fetch("#{val[:x]},#{val[:y] - 1}")) #bottom /top
          end
          if val[:y] < y_count
            stack.push(tile_hash.fetch("#{val[:x]},#{val[:y] + 1}")) #top / bottom
          end
        end
      end  
    }

    return tile_hash
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
    #params.require(:xCount)
    #params.require(:yCount)
    params.require([:xCount, :yCount, :tiles])
    
  end
end