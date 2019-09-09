class Api::V1::TilesController < ApplicationController
  wrap_parameters false
  logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))


  def largest
    logger.debug "NEW REQUEST"
    tile_hash = get_clusters_tile_hash(profile_params[0], profile_params[1], profile_params[2].to_h)

    tile_hash.each_pair {|key, value|
      logger.debug "#{value[:x]},#{value[:y]} - Cluster: #{value[:cluster_id]}"
    }

    render json: resp_body
  end

  private
  def get_clusters_tile_hash(x_count, y_count, tile_hash)
    stack = []
    cluster_id = 0;
    tile_cluster_hash = Hash.new

    logger.debug x_count
    logger.debug y_count

    tile_hash.each_pair {|key, value|
      stack.push([key, value])
      cluster_id += 1 #new cluster

      while !stack.empty?
        key_val = stack.pop()
        ks = key_val[0]
        val = key_val[1]

        if val[:visited]
          next
        end

        #inject property for graph traversal
        class << val
          attr_accessor :visited
        end
        val[:visited] = true

        if val[:active] #look for neighbors if active
          tile_cluster_hash[ks] = val;

          class << val # add cluster id to "link" the tiles
            attr_accessor :cluster_id
          end
          val[:cluster_id] = cluster_id;

          if val[:x] > 0
            k = "#{val[:x] - 1},#{val[:y]}"
            stack.push([k, tile_hash.fetch(k)]) #left
          end
          if val[:x] < x_count - 1 
            k = "#{val[:x] + 1},#{val[:y]}"
            stack.push([k, tile_hash.fetch(k)]) #right
          end
          if val[:y] > 0
            k = "#{val[:x]},#{val[:y] - 1}"
            stack.push([k, tile_hash.fetch(k)]) #bottom /top
          end
          if val[:y] < y_count - 1 
            k = "#{val[:x]},#{val[:y] + 1}"
            stack.push([k, tile_hash.fetch(k)]) #top / bottom
          end
        end
      end  
    }

    return tile_cluster_hash
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
    params.require([:xCount, :yCount, :tiles])
  end
end