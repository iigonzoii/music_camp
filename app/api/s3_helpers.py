import boto3
import botocore
import os
import uuid

#FOR IMAGES
IMG_BUCKET_NAME = os.environ.get("S3_IMG_BUCKET")
S3_IMG_LOCATION = f"https://{IMG_BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_IMG_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3_img = boto3.client(
    "s3_image",
    aws_access_key_id=os.environ.get("S3_IMG_KEY"),
    aws_secret_access_key=os.environ.get("S3_IMG_SECRET")
)

def get_unique_img_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_img_file_to_s3(file, acl="public-read"):
    try:
        s3_img.upload_fileobj(
            file,
            IMG_BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_IMG_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3_img.delete_object(
        Bucket=IMG_BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


#FOR TRACKS ************************************************************
TRACK_BUCKET_NAME = os.environ.get("S3_TRACK_BUCKET")
S3_TRACK_LOCATION = f"https://{TRACK_BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_TRACK_EXTENSIONS = {"wav", "mp3"}

s3_track = boto3.client(
    "s3_track",
    aws_access_key_id=os.environ.get("S3_TRACK_KEY"),
    aws_secret_access_key=os.environ.get("S3_TRACK_SECRET")
)

def get_unique_track_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_track_file_to_s3(file, acl="public-read"):
    try:
        s3_track.upload_fileobj(
            file,
            TRACK_BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_TRACK_LOCATION}{file.filename}"}

def remove_file_from_s3(track_url):
    # AWS needs the track file name, not the URL,
    # so you split that out of the URL
    key = track_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3_track.delete_object(
        Bucket=TRACK_BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
