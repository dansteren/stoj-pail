// Type definitions for storj v0.1.0
// Project: https://github.com/Storj/node-libstorj
// Definitions by: Dan Steren <https://github.com/dansteren>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6.2

declare module "storj" {
  export interface Bucket {
    name: string;
    created?: Date;
    id: string;
    decrypted: boolean;
  }

  export interface EnvironmentOptions {
    bridgeUrl: string;
    bridgeUser: string;
    bridgePass: string;
    encryptionKey: string;
    logLevel: number;
  }

  type EnvironmentInfoSchemes = "http";
  type ContentTypes = "application/json";
  type MimeType = "application/octet-stream";

  interface Tag {
    name: string;
    description: string;
  }

  export interface EnvironmentInfo {
    swagger: string;
    info: {
      title: string;
      version: string;
      description: string;
      ["x-protocol-version"]: string;
      ["x-core-version"]: string;
    };
    host: string;
    basePath: string;
    schemes: EnvironmentInfoSchemes[];
    consumes: ContentTypes[];
    produces: ContentTypes[];
    securityDefinitions: {
      basic: {
        type: string;
        description: string;
      };
      ["ecdsa public key"]: {
        type: string;
        description: string;
        name: string;
        in: string;
      };
      ["ecdsa signature"]: {
        type: string;
        description: string;
        name: string;
        in: string;
      };
    };
    tags: Tag[];
    paths: {
      ["/contacts"]: {
        get: Object;
      };
      ["/contacts/{nodeID}"]: {
        get: Object;
      };
      ["/users"]: {
        post: Object;
      };
      ["/users/{email}"]: {
        patch: Object;
        delete: Object;
      };
      ["/resets/{token}"]: {
        get: Object;
      };
      ["/activations/{token}"]: {
        post: Object;
        get: Object;
      };
      ["/deactivations/{token}"]: {
        get: Object;
      };
      ["/keys"]: {
        get: Object;
        post: Object;
      };
      ["/keys/{pubkey}"]: {
        delete: Object;
      };
      ["/frames"]: {
        get: Object;
        post: Object;
      };
      ["/frames/{frame_id}"]: {
        get: Object;
        put: Object;
        delete: Object;
      };
      ["/buckets"]: {
        get: Object;
        post: Object;
      };
      ["/buckets/{id}"]: {
        get: Object;
        patch: Object;
        delete: Object;
      };
      ["/buckets/{id}/tokens"]: {
        post: Object;
      };
      ["/buckets/{id}/files"]: {
        post: Object;
        get: Object;
      };
      ["/buckets/{id}/files/{file_id}"]: {
        get: Object;
        delete: Object;
      };
      ["/buckets/{id}/files/{file_id}/info"]: {
        get: Object;
      };
    };
  }

  export interface FileMetadata {
    filename: string;
    mimetype: MimeType;
    id: string;
  }

  export interface StoreFileOptions {
    filename: string;
    progressCallback: (
      progress: number,
      uploadedBytes: number,
      totalBytes: number
    ) => void;
    finishedCallback: (error: string, fileId: string) => void;
  }

  export interface ResolveFileOptions {
    filename: string;
    progressCallback: (
      progress: number,
      downloadedBytes: number,
      totalBytes: number
    ) => void;
    finishedCallback: (error: string) => void;
  }

  export interface State {
    error_status: null;
  }

  /**
   * A constructor for keeping encryption options and other environment
   * settings.
   * @param options
   */
  export class Environment {
    constructor(options: EnvironmentOptions);

    /**
     * Gets list of available buckets.
     */
    getBuckets(callback: (error: string, buckets: Bucket[]) => void): void;

    /**
     * Gets general API info.
     */
    getInfo(callback: (error: string, info: EnvironmentInfo) => void): void;

    /**
     * Creates a bucket.
     */
    createBucket(
      bucketName: string,
      callback: (error: string, bucket: Bucket) => void
    ): void;

    /**
     * Deletes a bucket.
     */
    deleteBucket(bucketId: string, callback: (error: string) => void): void;

    /**
     * List files in a bucket.
     */
    listFiles(
      bucketId: string,
      callback: (error: string, files: FileMetadata[]) => void
    ): void;

    /**
     * Uploads a file, returns state object.
     */
    storeFile(
      bucketId: string,
      filePath: string,
      options: StoreFileOptions
    ): State;

    /**
     * This will cancel an upload.
     */
    storeFileCancel(state: State): void;

    /**
     * Downloads a file, return state object.
     */
    resolveFile(
      bucketId: string,
      fileId: string,
      filePath: string,
      options: ResolveFileOptions
    ): State;

    /**
     * This will cancel a download.
     */
    resolveFileCancel(state: State): void;

    /**
     * Deletes a file from a bucket.
     */
    deleteFile(
      bucketId: string,
      fileId: string,
      callback: (err: string) => void
    ): void;

    /**
     * This will zero and free memory of encryption keys and the environment.
     */
    destroy(): void;
  }

  /**
   * Will create a new Encryption Key string for file encryption/decryption.
   * @param bits Number of bits to use.
   */
  export function mnemonicGenerate(bits: number): string;

  /**
   * Will return boolean to verify that an Encryption Key hasn't been typed
   * incorrectly by verifying the checksum and format.
   * @param encryptionKey The Encryption Key to check.
   */
  export function mnemonicCheck(encryptionKey: string): boolean;

  /**
   * Returns current unix timestamp in milliseconds.
   */
  export function utilTimestamp(): number;
}
