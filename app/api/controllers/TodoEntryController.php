<?php
class TodoEntryController extends Controller {
    public function __construct(){
        parent::__construct("todoentry");
    }
    public function Map(){
        $this->Route( 'GET', '', function() {
            if(AuthRepository::Autherize()){
                $todoEntryRepository = new TodoEntryRepository;
                $voteRepository = new VoteRepository;
                $entries = $todoEntryRepository->LoadAll([
                ["CreatorUserId" => "user"],
                ["ProofPhotoId" => "media"]
                ]);
                $counter = 0;
                while($counter < count($entries)){
                    $votes = $voteRepository->LoadWhere("TodoEntryId = ".$entries[$counter]["Id"]);
                    $voteCounter = 0;
                    $downVoteCounter = 0;
                    $hasUserUpVoted = null;
                    foreach($votes as $vote){
                        if($vote["UpVote"] == "1"){
                            $voteCounter++;
                        } else {
                            $voteCounter--;
                        }
                        if($vote["UserId"] == AuthRepository::GetUserId()){
                            $hasUserUpVoted = $vote["UpVote"] == "1";
                        }
                    }
                    $entries[$counter]["Karma"] = $voteCounter;
                    //null = not votet
                    //true = upvoted
                    //false = downvoted
                    $entries[$counter]["HasUserUpVoted"] = $hasUserUpVoted;
                    $counter++;
                }
                $this->Send($entries);
            }
        });
        $this->Route('POST', '/delete', function(){
            $request = $this->GetRequestData();
            if(AuthRepository::Autherize()){
                if(isset($request->entryId)){
                    $todoEntryRepository = new TodoEntryRepository;
                    $todoEntryRepository->Delete($request->entryId);
                    $this->Send([
                    "Status" => $todoEntryRepository->GetQueryError() == "",
                    "Error" => $todoEntryRepository->GetQueryError(),
                    ]);
                } else {
                    $this->NotFound();
                    
                }
            }
        });
        $this->Route('POST', '/create',function(){
            $request = $this->GetRequestData();
            if(AuthRepository::Autherize()){
                if(isset($request->Title)){
                    $todoEntryRepository = new TodoEntryRepository;
                    $callback = $todoEntryRepository->Save(array(
                    "Title" => isset($request->Title) ? $request->Title : NULL,
                    "Message" => isset($request->Message) ? $request->Message : NULL,
                    "Destination" => isset($request->Destination) ? $request->Destination : NULL,
                    "ApplicationDate" => isset($request->ApplicationDate) ? $request->ApplicationDate : NULL,
                    "MaxPersonNumber" => isset($request->MaxPersonNumber) ? $request->MaxPersonNumber : NULL,
                    "ProofPhotoRequired" =>  isset($request->ProofPhotoRequired) ? $request->ProofPhotoRequired : NULL,
                    "Public" => isset($request->Public) ? $request->Public : NULL,
                    "CreatorUserId" => AuthRepository::GetUserId(),
                    "Active" => true,
                    "Finished" => false
                    ));
                    $this->Send([
                    "Status" => $callback != 0,
                    "Error" => $todoEntryRepository->GetQueryError(),
                    "Record" => $todoEntryRepository->GetById($todoEntryRepository->GetLastInsertedId(), [
                    ["CreatorUserId" => "user"],
                    ["ProofPhotoId" => "photo"]
                    ])
                    ]);
                } else {
                    $this->NotFound();
                }
            }
        });
        $this->Route('POST', '/vote', function(){
            if(AuthRepository::Autherize()){
                $request = $this->GetRequestData();
                if(isset($request->UpVoted) && isset($request->TodoEntryId)){
                    $voteRepository = new VoteRepository;
                    if(count($voteRepository->LoadWhere("UserId = ". AuthRepository::GetUserId()." AND TodoEntryId = ".$request->TodoEntryId)) > 0){
                        $voteRepository->UpdateWhere("UserId = ". AuthRepository::GetUserId()." AND TodoEntryId = ".$request->TodoEntryId,
                        ["UpVote" => $request->UpVoted]);
                    } else {
                        $voteRepository->Save([
                        "UpVote" => $request->UpVoted,
                        "TodoEntryId" => $request->TodoEntryId,
                        "UserId" => AuthRepository::GetUserId()
                        ]);
                    }
                    $this->Send([
                    "Status" => $voteRepository->GetQueryError() == "",
                    "Error" => $voteRepository->GetQueryError(),
                    ]);
                } else {
                    $this->NotFound();
                }
            }
        });
        $this->Route('POST', '/finish', function(){
            if(AuthRepository::Autherize()){
                if(isset($_POST["entryId"]) && isset($_FILES['file'])){
                    $media = $_FILES['file'];
                    $entryId = $_POST["entryId"];
                    
                    $todoEntryRepository = new TodoEntryRepository;
                    $mediaRepository = new MediaRepository;
                    
                    
                    $uniqid = uniqid();
                    
                    $newMediaName = $uniqid.".jpg";
                    $entry = $todoEntryRepository->LoadWhere("Id = $entryId")[0];
                    
                    
                    $uploadFile = false;
                    $imageRepository = new ImageRepository;
                    try{
                        $imageRepository->SaveImage($media, $uniqid);
                        $uploadFile = true;
                    } catch (Exception $ex){
                        $uploadFile = false;
                    }
                    
                    
                    if($uploadFile){
                        $mediaRepository->Save([
                        "UploadUserId" => AuthRepository::GetUserId(),
                        "Description" => "Bewisfoti vom Bitrag \"". $entry["Title"] ."\"",
                        "Destination" => $entry["Destination"] != null ? $entry["Destination"] : null,
                        "Path" => $newMediaName
                        ]);
                        
                        
                        $todoEntryRepository->UpdateWhere("Id = $entryId", [
                        "ProofPhotoId" => $mediaRepository->GetLastInsertedId(),
                        "Finished" => true
                        ]);
                        $this->Send(["Status" => true]);
                    } else {
                        $this->Send(["Status" => false, "Message" => "Couldn't upload file"]);
                    }
                    
                    
                } else {
                    $this->NotFound();
                }
            }
        });
    }
}
?>