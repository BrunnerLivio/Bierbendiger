<?php
abstract class Repository extends DBConnect {
	private $tablename;
    private function MapTable($resultObj, $relations){
        foreach($relations as $relation){
            $counter = 0;
            foreach($resultObj as $obj){
                foreach($relation as $id => $table){
                        if(isset($obj[$id])){
                            $tableId = $obj[$id];
                            unset($resultObj[$counter][$id]);
                            $result = mysqli_query($this->conn, "SELECT * FROM $table WHERE Id = $tableId");
                            $resultTable = mysqli_fetch_all ($result, MYSQLI_ASSOC);
                            if(count($resultTable) != 0){
                                if(isset($resultTable[0]["Password"])){
                                    unset($resultTable[0]["Password"]);
                                }
                                $resultObj[$counter][$table] = $resultTable[0];
                                
                            }
                            
                        }
                }
                $counter++;
            }
        }
        
        return $resultObj;
    }
	public function __construct($tablename){
		parent::__construct();
		$this->tablename = $tablename;
	}
	public function LoadAll($relation = null){
		$result = mysqli_query($this->conn, "SELECT * FROM ". $this->tablename);
        $resultObj =  mysqli_fetch_all ($result, MYSQLI_ASSOC);;
		if(isset($relation)){
            $resultObj = $this->MapTable($resultObj, $relation);
        }
        return $resultObj;
	}
	public function LoadWhere($where, $relation = null){
		$result = mysqli_query($this->conn, "SELECT * FROM ". $this->tablename ." WHERE ". $where);
		$resultObj = mysqli_fetch_all ($result, MYSQLI_ASSOC);
        if(isset($relation)){
            $resultObj = $this->MapTable($resultObj, $relation);
        }
        return $resultObj;
	}
    public function LoadOrderBy($orderby, $relation = null){

        $result = mysqli_query($this->conn, "SELECT * FROM ". $this->tablename ." ORDER BY ". $orderby);
        $resultObj = mysqli_fetch_all ($result, MYSQLI_ASSOC);
        if(isset($relation)){
            $resultObj = $this->MapTable($resultObj, $relation);
        }
        
		return $resultObj;
    }
    public function UpdateWhere($where, $obj){
        $attributesAndValues = "";
		$counter = 0;
		while ($counter < count($obj)) {
			$value = $obj[key($obj)];
            $key = key($obj);
			$attributesAndValues .= $key. "='" .$value."'";
			if($counter < count($obj) - 1){
				$attributesAndValues .= ", ";
			}
			$counter++;
			next($obj);
		}
		$result = mysqli_query($this->conn, "UPDATE ". $this->tablename ." SET ". $attributesAndValues ." WHERE ". $where);
		return mysqli_insert_id ($this->conn);
    }
	public function Save($obj){
		$keyString = "";
		$valueString = "";
		$counter = 0;
		while ($counter < count($obj)) {
			$value = $obj[key($obj)];
            $key = key($obj);
			$keyString .= $key;
			$valueString .= "'". $value ."'";
			if($counter < count($obj) - 1){
				$keyString .= ", ";
				$valueString .= ", ";
			}
			$counter++;
			next($obj);
		}
		$result = mysqli_query($this->conn, "INSERT INTO ". $this->tablename ." (". $keyString .") VALUES (". $valueString. ")");
		return mysqli_insert_id ($this->conn);
	}
	public function GetById($id, $relation  = null){
		$result = mysqli_query($this->conn, "SELECT * FROM ". $this->tablename ." WHERE Id = $id");
		$resultObj = mysqli_fetch_all ($result, MYSQLI_ASSOC);
        if(isset($relation)){
            $resultObj = $this->MapTable($resultObj, $relation);
        }
        return $resultObj[0];
	}
	public function Delete($id){
		mysqli_query($this->conn, "DELETE FROM ". $this->tablename ." WHERE Id = $id");
	}
}
?>